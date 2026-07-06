# textlint-rule-spectral

A textlint rule plugin which performs validation of the yaml in a document using spectral.
Currently only a subset of spectral functionality is supported with the available functionality being:

- Schema validation of properties including those required & if additional properties are allowed

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm install textlint-rule-spectral
```

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
  "rules": {
    "spectral": true
  }
}
```

Via CLI

```shell
textlint --rule spectral README.md
```

## Configuration Options

### additional-properties

Enables the yaml in the document to contain properties in addition to those defined in the `properties` setting.
This setting behaves the same as `additionalProperties` in json-schema.

- **Config Property:** `additional-properties`
- **Value type:** `boolean`
- **Default Value:** `true`

### properties

Defines the properties which MAY appear in the yaml in the document.
Use `required-properties` to define the properties which MUST be present.
This setting behaves the same as `properties` in json-schema.

- **Config Property:** `properties`
- **Value type:** `string[]`
- **Default Value:** `[]`

### required-properties

Defines the properties which MUST appear in the yaml in the document.
This setting behaves the same as `requiredProperties` in json-schema.

- **Config Property:** `required-properties`
- **Value type:** `string[]`
- **Default Value:** `[]`

## License

MIT © WeMicroIt
