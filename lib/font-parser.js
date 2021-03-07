const { space } = require('postcss/lib/list');

const fontWeightValues = ['bold', 'bolder', 'lighter'];

const fontStretchValues = [
    'ultra-condensed',
    'extra-condensed',
    'condensed',
    'semi-condensed',
    'normal',
    'semi-expanded',
    'expanded',
    'ultra-expanded',
];

const defaults = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-stretch': 'normal',
};

module.exports = (value) => {
    const entries = space(value).reduce((properties, token) => {
        if (token === 'italic') {
            properties['font-style'] = token;
        } else if (fontWeightValues.includes(token) || /^\d+$/.test(token)) {
            properties['font-weight'] = token;
        } else if (fontStretchValues.includes(token)) {
            properties['font-stretch'] = token;
        }
        return properties;
    }, {});

    return Object.entries(Object.assign({}, defaults, entries));
};
