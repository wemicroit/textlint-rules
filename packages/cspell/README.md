# textlint-rule-cspell

A textlint rule plugin which performs a cspell check of the docs.
When a single suggestion is identified, the correction is performed.

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm install textlint-rule-cspell
```

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "cspell": true
    }
}
```

Via CLI

```shell
textlint --rule cspell README.md
```

## License

MIT © WeMicroIt
