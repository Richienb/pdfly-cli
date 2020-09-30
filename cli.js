#!/usr/bin/env node
"use strict"
const { promises: fs } = require("fs")
const meow = require("meow")
const getStdin = require("get-stdin")
const updateNotifier = require("update-notifier")
const path = require("path")
const pdfly = require("pdfly")

const { input, flags, pkg } = meow(`
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
`, {
	flags: {
		output: {
			type: "string"
		},
		margin: {
			type: "string"
		},
		marginTop: {
			type: "string"
		},
		marginBottom: {
			type: "string"
		},
		marginLeft: {
			type: "string"
		},
		marginRight: {
			type: "string"
		},
		height: {
			type: "string"
		},
		width: {
			type: "string"
		},
		format: {
			type: "string"
		},
		pages: {
			type: "string"
		},
		landscape: {
			type: "boolean"
		},
		scale: {
			type: "number"
		},
		backgroundGraphics: {
			type: "boolean"
		},
		headerFooter: {
			type: "boolean"
		},
		headerTemplate: {
			type: "string"
		},
		footerTemplate: {
			type: "string"
		}
	},
	inferType: true
})

updateNotifier({ pkg }).notify()

const [file] = input

module.exports = (async () => {
	const html = file ? await fs.readFile(file, "utf8") : await getStdin()

	const pdf = await pdfly(html, {
		margin: {
			top: flags.marginTop || flags.margin,
			bottom: flags.marginBottom || flags.margin,
			left: flags.marginLeft || flags.margin,
			right: flags.marginRight || flags.margin
		},
		height: flags.height,
		width: flags.width,
		format: flags.format,
		pageRanges: flags.pages,
		landscape: flags.landscape,
		scale: flags.scale,
		printBackground: flags.backgroundGraphics,
		displayHeaderFooter: flags.headerFooter,
		headerTemplate: flags.headerTemplate,
		footerTemplate: flags.footerTemplate
	})

	if (flags.output) {
		await fs.mkdir(path.dirname(flags.output), { recursive: true })
		await fs.writeFile(flags.output, pdf)
	} else {
		process.stdout.write(pdf)
	}
})()
