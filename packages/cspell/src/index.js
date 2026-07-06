const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");
const { spellCheckDocument } = require("cspell-lib");

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, getSource, locator } = context;
  const allows = options.allows ?? [];
  return {
    async [Syntax.DocumentEnd](node) { // "Str" node
      const uri = pathToFileURL(resolve(filename)).toString();
      const result = await spellCheckDocument(
        { uri },
        { generateSuggestions: true, noConfigSearch: true },
        { words: customWords, suggestionsTimeout: 2000 }
      );
      console.log(result.issues);
      for(var issue in result.issues){
        const ruleError = new RuleError(issue.text);
        report(node, ruleError);
      }
    }
};
