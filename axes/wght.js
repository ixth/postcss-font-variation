const AxisParseError = require('./axis-parse-error');

const FONT_WEIGHT = { normal: 400, bold: 700 };

const parseFontWeight = (value) => (!isFinite(value) ? FONT_WEIGHT[value] : Number(value));

const getVariationWeight = (value) => {
    if (/^(?:bolder|lighter)$/.test(value)) {
        throw new AxisParseError(
            `font-variation axis 'wght' doesn't support values \`bolder\` of \`lighter\`, skipping`
        );
    }

    const weight = parseFontWeight(value);
    if (weight === undefined) {
        throw new AxisParseError(`Couldn't parse weight from \`${value}\``);
    }

    return weight;
};

module.exports = { getVariationWeight };
