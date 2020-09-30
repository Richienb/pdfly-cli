const test = require("ava")
const parsePdf = require("pdf-parse")
const execa = require("execa")

test("main", async t => {
	const { stdout: pdf } = await execa("./cli.js", ["fixture.html"], { encoding: "" })
	const { text: pdfText } = await parsePdf(pdf)
	t.is(pdfText.trim(), "Hello World")
})
