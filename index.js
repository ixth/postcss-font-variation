const { getVariationWeight } = require('./axes/wght');
const { getVariationItalic } = require('./axes/ital');
const { getVariationWidth } = require('./axes/wdth');
const parseFontShorthand = require('./lib/font-parser');
const AxisParseError = require('./axes/axis-parse-error');

const variationGetters = {
    font: (value) =>
        parseFontShorthand(value)
            .filter(([prop]) => ({}.hasOwnProperty.call(variationGetters, prop)))
            .map(([prop, value]) => variationGetters[prop](value))
            .join(' '),
    'font-stretch': (value) => `--fws-wdth: ${getVariationWidth(value)};`,
    'font-style': (value) => `--fws-ital: ${getVariationItalic(value)};`,
    'font-weight': (value) => `--fws-wght: ${getVariationWeight(value)};`,
};

module.exports = {
    postcssPlugin: 'postcss-font-variation',
    prepare: (result) => {
        const affectedRules = new Set();

        const handleDecl = (decl) => {
            try {
                decl.after(variationGetters[decl.prop](decl.value));
            } catch (e) {
                /* istanbul ignore if */
                if (!(e instanceof AxisParseError)) {
                    throw e;
                }
                decl.warn(result, e.message);
            }
            affectedRules.add(decl.parent);
        };

        return {
            Declaration: {
                font: handleDecl,
                'font-stretch': handleDecl,
                'font-style': handleDecl,
                'font-weight': handleDecl,
            },

            OnceExit: (root) => {
                root.append(':root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }');
                affectedRules.forEach((node) => {
                    node.append(
                        `font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght);`
                    );
                });
            },
        };
    },
};
