# textlint-rule-frontmatter

A textlint rule plugin which performs the following checks on the Yaml Frontmatter in the docs:

- Frontmatter title matches h1 heading in document.
- A collection of ordered properties which appear at start of frontmatter.
- If the ordered properties are all required to be present in the frontmatter.

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

### include-paths

Defines a list of paths which are to be processed by this rule,
in particular the requirement of the document to contain frontmatter.

- **Config Property:** `include-paths`
- **Value type:** `string[]`
- **Default Value:** `["*.md", "**/*.md"]`

### ordered-properties

Defines a list of frontmatter properties that are required to be present,
with the order in which they are defined representing the order in which they are to appear.

- **Config Property:** `ordered-properties`
- **Value type:** `string[]`
- **Default Value:** `[]`

### require-ordered-properties

Enforces that all the ordered properties specified via `ordered-properties` must be present.

- **Config Property:** `require-ordered-properties`
- **Value type:** `boolean`
- **Default Value:** `false`

### title-must-match-h1

Ensures that all documents MUST have a frontmatter title which
matches the h1 used in the document.

- **Config Property:** `title-must-match-h1`
- **Value type:** `boolean`
- **Default Value:** `false`

### title-must-differ-linkTitle

Ensures that the linkTitle frontmatter property differs to the
title frontmatter property.

- **Config Property:** `title-must-differ-linkTitle`
- **Value type:** `boolean`
- **Default Value:** `false`

## License

MIT © WeMicroIt
