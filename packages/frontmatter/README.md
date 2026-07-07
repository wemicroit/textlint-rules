# textlint-rule-frontmatter

A textlint rule plugin which performs the following checks on the Yaml Frontmatter in the docs:

- Title matches h1 heading

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm install textlint-rule-frontmatter
```

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
  "rules": {
    "frontmatter": true
  }
}
```

Via CLI

```shell
textlint --rule frontmatter README.md
```

## Configuration Options

### ordered-properties

Defines a list of frontmatter properties that are required to be present,
with the order in which they are defined representing the order in which they are to appear.

- **Config Property:** `ordered-properties`
- **Value type:** `string[]`
- **Default Value:** `[]`

### title-must-match-h1

Ensures that all documents must have a front matter title and
that it must match the h1 used in the document.

- **Config Property:** `title-must-match-h1`
- **Value type:** `boolean`
- **Default Value:** `true`

## License

MIT © WeMicroIt
