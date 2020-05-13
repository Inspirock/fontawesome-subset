/**
 * Author: Logan Graham <loganparkergraham@gmail.com>
 * Maintainer: Ashutosh Mimani <ashutosh.mimani@inspirock.com>
 */

const
        fs = require('fs'),
        path = require('path'),
        mkdirp = require('mkdirp'),
        svg2ttf = require('svg2ttf'),
        ttf2eot = require('ttf2eot'),
        ttf2woff = require('ttf2woff'),
        ttf2woff2 = require('ttf2woff2');

const svg_file_path = __dirname + `/node_modules/font-awesome/fonts/fontawesome-webfont.svg`;

/**
 * This function will take an object of glyph names and output a subset of the standard fonts optimized in size for
 * use on websites / external resources.
 *
 * @param subset Array or Object containing glyph / font family names.
 * @param output_dir Directory output generated webfonts.
 */
function fontawesomeSubset(subset, output_dir) {
    if (!fs.existsSync(svg_file_path)) {
        console.error("FontAwesome svg file not found at", svg_file_path);
        return;
    }

    const svg_file = fs.readFileSync(svg_file_path).toString(),
            glyphs_to_remove = ((svg_file) => {
                let glyphs = [],
                        matcher = new RegExp('<glyph glyph-name="([^"]+)"', 'gms'),
                        current_match;

                while (current_match = matcher.exec(svg_file)) {
                    if (subset.indexOf(current_match[1]) === -1) {
                        glyphs.push(current_match[1]);
                    }
                }

                return glyphs;
            })(svg_file),
            svg_contents_new = svg_file.replace(new RegExp(`(<glyph glyph-name="(${glyphs_to_remove.join('|')})".*?\\/>)`, 'gms'), '').replace(/>\s+</gms, '><'),
            ttf_utils = svg2ttf(svg_contents_new, {
                fullname: 'FontAwesome',
                familyname: 'FontAwesome'
            }),
            ttf = Buffer.from(ttf_utils.buffer);

    mkdirp.sync(path.resolve(output_dir), (err) => {
        if (err) {
            console.error(err);
            console.error("Unable to create directory for output files.");
        }
    });

    const output_file = path.resolve(output_dir, 'fontawesome-webfont-subset');

    fs.writeFileSync(`${output_file}.svg`, svg_contents_new);
    fs.writeFileSync(`${output_file}.ttf`, ttf);
    fs.writeFileSync(`${output_file}.eot`, ttf2eot(ttf).buffer);
    fs.writeFileSync(`${output_file}.woff`, ttf2woff(ttf).buffer);
    fs.writeFileSync(`${output_file}.woff2`, ttf2woff2(ttf));
}

module.exports = fontawesomeSubset;