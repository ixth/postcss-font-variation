const parseFontShorthand = require('../lib/font-parser');

describe('font-parser', () => {
    test('should process only necessary properties', () => {
        expect(parseFontShorthand('italic bold condensed 16px sans-serif')).toMatchInlineSnapshot(`
      Array [
        Array [
          "font-style",
          "italic",
        ],
        Array [
          "font-weight",
          "bold",
        ],
        Array [
          "font-stretch",
          "condensed",
        ],
      ]
    `);

        expect(parseFontShorthand('italic 16px/1.4 sans-serif')).toMatchInlineSnapshot(`
      Array [
        Array [
          "font-style",
          "italic",
        ],
        Array [
          "font-weight",
          "normal",
        ],
        Array [
          "font-stretch",
          "normal",
        ],
      ]
    `);

        expect(parseFontShorthand('bold 16px/1.4 sans-serif')).toMatchInlineSnapshot(`
      Array [
        Array [
          "font-style",
          "normal",
        ],
        Array [
          "font-weight",
          "bold",
        ],
        Array [
          "font-stretch",
          "normal",
        ],
      ]
    `);

        expect(parseFontShorthand('condensed 16px sans-serif')).toMatchInlineSnapshot(`
      Array [
        Array [
          "font-style",
          "normal",
        ],
        Array [
          "font-weight",
          "normal",
        ],
        Array [
          "font-stretch",
          "condensed",
        ],
      ]
    `);

        expect(parseFontShorthand('16px sans-serif')).toMatchInlineSnapshot(`
      Array [
        Array [
          "font-style",
          "normal",
        ],
        Array [
          "font-weight",
          "normal",
        ],
        Array [
          "font-stretch",
          "normal",
        ],
      ]
    `);
    });
});
