# FontAwesome 4.7 Subset

This project is forked from https://github.com/omacranger/fontawesome-subset and modified to work with FontAwesome 4.7

---

Love FontAwesome but don't need thousands of icons bundled on every page of the site? Me either. `fontawesome-subset` is a utility for creating subsets of FontAwesome for optimized use on the web. It works by taking glyph names that you've used (`angle-left`, `caret-up`, etc) and creating an optimized font with only the glyphs you need. Yes, SVG icons and fragments are fancier and more feature filled - but if you already have a website built using the webfont - why switch -- right?

## Usage
Install: 
```bash
npm install --save-dev fontawesome-subset 
```

Run via your favorite task runner:
```javascript
// Require fontawesome-subset
const fontawesomeSubset = require('fontawesome-subset');

// Create or append a task to be ran with your configuration
fontawesomeSubset(['check','square','caret-up'], 'out');
```

### Full Options

#### fontawesomeSubset(subset, output_dir, options)
- `subset` - Array containing list of glyph names (icon names) that you want to limit the subset to.
- `output_dir` - Directory that you want the webfonts to be generated in. Relative to current NPM process. Ex: `out`

The above example would output a directory with the following structure:
```
/out/
    fontawesome-webfont-subset.eot
    fontawesome-webfont-subset.svg
    fontawesome-webfont-subset.ttf
    fontawesome-webfont-subset.woff
    fontawesome-webfont-subset.woff2
```

It is still up to you to determine which glyphs you need and to pass them to the function to generate the webfonts. I recommend optimizing your CSS files as well to get the most from the tool.

## Contributing: Publish

Once changes are ready to be published, use "np publish" to publish to the repository
