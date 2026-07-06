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

#### property-order

Defines a list of frontmatter properties that are required to be present as well as the order in which they appear.

- **Config Property:** `property-order`
- **Value type:** `string[]`
- **Default Value:** `[]`

## titles-must-match

Ensures that all documents must have a front matter title and it must match the h1 used in the document.

- **Config Property:** `titles-must-match`
- **Value type:** `boolean`
- **Default Value:** `true`

## License

MIT © WeMicro It
