const postcss = require('postcss');
const plugin = require('../index');

const process = (source) => {
    const { css, messages } = postcss().use(plugin).process(source, {});
    return {
        css,
        messages: messages
            .filter(({ plugin }) => plugin === 'postcss-font-variation')
            .map((message) => message.text),
    };
};

describe('font-variation', () => {
    test('should process font-weight', () => {
        expect(process('selector { font-weight: 300 }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: 300;--fws-wght: 300;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-weight: normal }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: normal;--fws-wght: 400;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-weight: bold }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: bold;--fws-wght: 700;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);
    });

    test('should add warnings if font-weight property is malformed', () => {
        expect(process('selector { font-weight: lighter }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: lighter;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "font-variation axis 'wght' doesn't support values \`bolder\` of \`lighter\`, skipping",
        ],
      }
    `);

        expect(process('selector { font-weight: bolder }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: bolder;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "font-variation axis 'wght' doesn't support values \`bolder\` of \`lighter\`, skipping",
        ],
      }
    `);

        expect(process('selector { font-weight: boulder }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: boulder;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "Couldn't parse weight from \`boulder\`",
        ],
      }
    `);
    });

    test('should process font-stretch', () => {
        expect(process('selector { font-stretch: ultra-condensed }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: ultra-condensed;--fws-wdth: 50;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: extra-condensed }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: extra-condensed;--fws-wdth: 62.5;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: condensed }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: condensed;--fws-wdth: 75;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: semi-condensed }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: semi-condensed;--fws-wdth: 87.5;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: normal }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: normal;--fws-wdth: 100;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: semi-expanded }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: semi-expanded;--fws-wdth: 112.5;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: expanded }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: expanded;--fws-wdth: 125;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: extra-expanded }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: extra-expanded;--fws-wdth: 150;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: ultra-expanded }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: ultra-expanded;--fws-wdth: 200;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-stretch: ultra-violence }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: ultra-violence;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "Couldn't parse stretch ratio from \`ultra-violence\`",
        ],
      }
    `);

        expect(process('selector { font-stretch: extra-% }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: extra-%;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "Couldn't parse stretch ratio from \`extra-%\`",
        ],
      }
    `);

        expect(process('selector { font-stretch: 0 }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-stretch: 0;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [
          "Couldn't parse stretch ratio from \`0\`",
        ],
      }
    `);
    });

    test('should handle font-style: italic', () => {
        expect(process('selector { font-style: normal }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-style: normal;--fws-ital: null;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-style: italic }')).toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-style: italic;--fws-ital: 1;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght) }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);
    });

    test('should handle multiple axes', () => {
        expect(process('selector { font-style: italic; font-weight: bold; font-stretch: 146%; }'))
            .toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-style: italic;--fws-ital: 1; font-weight: bold;--fws-wght: 700; font-stretch: 146%;--fws-wdth: 146;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght); }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);
    });

    test('should handle font shorthand', () => {
        expect(process('selector { font: italic bold condensed 16px/1.4 sans-serif; }'))
            .toMatchInlineSnapshot(`
      Object {
        "css": "selector { font: italic bold condensed 16px/1.4 sans-serif;--fws-ital: 1;--fws-wght: 700;--fws-wdth: 75;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght); }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);
    });

    test('should handle overrides properly', () => {
        expect(process('selector { font: bold 16px sans-serif; font-weight: normal; }'))
            .toMatchInlineSnapshot(`
      Object {
        "css": "selector { font: bold 16px sans-serif;--fws-ital: null;--fws-wght: 700;--fws-wdth: 100; font-weight: normal;--fws-wght: 400;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght); }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);

        expect(process('selector { font-weight: bold; font: 16px sans-serif; }'))
            .toMatchInlineSnapshot(`
      Object {
        "css": "selector { font-weight: bold;--fws-wght: 700; font: 16px sans-serif;--fws-ital: null;--fws-wght: 400;--fws-wdth: 100;font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght); }:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }",
        "messages": Array [],
      }
    `);
    });
});
