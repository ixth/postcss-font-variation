const AxisParseError = require('./axis-parse-error');

const FONT_STRETCH = {
    'ultra-condensed': 50,
    'extra-condensed': 62.5,
    condensed: 75,
    'semi-condensed': 87.5,
    normal: 100,
    'semi-expanded': 112.5,
    expanded: 125,
    'extra-expanded': 150,
    'ultra-expanded': 200,
};

const getVariationWidth = (value) => {
    if (Object.prototype.hasOwnProperty.call(FONT_STRETCH, value)) {
        return FONT_STRETCH[value];
    }

    if (!value.endsWith('%')) {
        throw new AxisParseError(`Couldn't parse stretch ratio from \`${value}\``);
    }

    const percent = value.slice(0, -1);
    if (!isFinite(percent)) {
        throw new AxisParseError(`Couldn't parse stretch ratio from \`${value}\``);
    }

    return Number(percent);
};

module.exports = { getVariationWidth };
