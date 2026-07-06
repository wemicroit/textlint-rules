const { Spectral, Document } = require("@stoplight/spectral-core");
const Parsers = require("@stoplight/spectral-parsers");
const { schema } = require("@stoplight/spectral-functions");

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, getSource, locator } = context;
  
  const propeties = Object.fromEntries(
    options["properties"]?.map(key => [key, {}]) ?? []
  );
  const additionalProperties = options["additional-properties"] ?? true;
  const requiredProperties = options["required-properties"] ?? [];
  return {
    async ["Yaml"](node) {
      // "Yaml" node
      // this will be our API specification document
      var yamlDocument = `---\n` + node.value;
      const myDocument = new Document(yamlDocument, Parsers.Yaml, "/my-file");

      const spectral = new Spectral();
      spectral.setRuleset({
        // this will be our ruleset
        rules: {
          "json-schema": {
            given: "$",
            //message: "Frontmatter must satisfy the schema.",
            then: {
              function: schema,
              functionOptions: {
                allErrors: true,
                schema: {
                  type: "object",
                  properties: propeties,
                  required: requiredProperties,
                  additionalProperties: additionalProperties,
                },
              },
            },
          },
        },
      });

      var errors = [];
      // we lint our document using the ruleset we passed to the Spectral object
      var results = await spectral.run(myDocument);
      for (const result of results) {
        const ruleError = new RuleError(result.message);
        report(node, ruleError);
      }
    },
  };
}
