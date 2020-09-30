# pdfly-cli [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/pdfly-cli/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/pdfly-cli)

Generate a pdf from html.

[![NPM Badge](https://nodei.co/npm/pdfly-cli.png)](https://npmjs.com/package/pdfly-cli)

## Install

```sh
npm install --global pdfly-cli
```

## Usage

```
$ pdfly --help

	Usage
	  $ pdfly <html>
	  $ cat <html> | pdfly

	Options
	  --output Write the resulting pdf to the specified output file. If an output file is not provided, the result will be piped to stdout.
	  --margin The size of the margins in the resulting pdf. Margins for specific sides of the page override this option. Can be a labelled unit or number which will be treated as pixels.
	  --margin-top The size of the top margin in the resulting pdf.
	  --margin-bottom The size of the bottom margin in the resulting pdf.
	  --margin-left The size of the left margin in the resulting pdf.
	  --margin-right The size of the right margin in the resulting pdf.
	  --format The paper format the resulting pdf. Overrides --height and --width. Can be Letter, Legal, Tabloid, Ledger, A0, A1, A2, A3, A4, A5 or A6.
	  --height The height of the resulting pdf. Can be a labelled unit or a number which will be treated as pixels.
	  --width The width of the resulting pdf. Can be a labelled unit or a number which will be treated as pixels.
	  --pages The page ranges to save. For example: "1-5, 8, 11-13". Saves all pages by default.
	  --landscape Save the resulting pdf in the landscape orientation instead of portrait.
	  --scale The scale to render the html at. Set to 1 by default.
	  --background-graphics Include the background graphics.
	  --header-footer Include the header and footer.
	  --header-template HTML template for the header. Can include these classes: date, title, url, pageNumber and totalPages
	  --footer-template HTML template for the footer. Can include these classes: date, title, url, pageNumber and totalPages

	Examples
	  $ pdfly file.html --output output.pdf
	  $ cat file.html | pdfly --margin 20 --margin-top 5 > output.pdf
```
