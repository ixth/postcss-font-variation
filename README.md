# PostCSS Font Variation Plugin

[![Test workflow status][badge]](https://github.com/ixth/postcss-font-variation/actions/workflows/test.yml)

[badge]: https://github.com/ixth/postcss-font-variation/actions/workflows/test.yml/badge.svg

[PostCSS] Font Variation Plugin adds `font-variation-settings` based on `font-stretch`,
`font-style`, `font-weight` and `font` properties. Simply put, it saves you the hassle
of declaring both `font-weight`/`font-style`/etc. and `font-variation-settings`,
when you are using variable fonts.

[PostCSS]: https://github.com/postcss/postcss

```diff
 .foo {
     font-weight: bold;
+    --fws-wght: 700;
+    font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght);
 }
+:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }
```

Plugin uses CSS variables, which allows combining settings from multiple matching rules. E.g.:

```diff
 .foo {
     font: italic bold 16px/1.4 sans-serif;
+    --fws-ital: 1;
+    --fws-wght: 700;
+    font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght);
 }
 .bar {
     font-weight: normal;
+    --fws-wght: 400;
+    font-variation-settings: 'ital' var(--fws-ital), 'wdth' var(--fws-wdth), 'wght' var(--fws-wght);
 }
+:root { --fws-ital: 0; --fws-wdth: 100; --fws-wght: 400; }
```

This way element with `class="foo bar"` will have `font-variation-settings`
set to&nbsp;`'ital' 1, 'wdth' 100, 'wght' 400`, not just `'wght' 400`.

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-font-variation
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json` or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs] and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
 module.exports = {
      plugins: [
+        require('postcss-font-variation'),
         require('autoprefixer')
      ]
 }
```

[official docs]: https://github.com/postcss/postcss#usage
