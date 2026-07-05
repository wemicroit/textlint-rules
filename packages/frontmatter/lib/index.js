"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const matter = require('gray-matter');

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
function _default(context, options = {}) {
  const {
    Syntax,
    RuleError,
    report,
    getSource,
    locator
  } = context;
  const allows = options.allows ?? [];
  var yamlHeading;
  return {
    ['Yaml'](node) {
      // "Str" node
      const text = getSource(node); // Get text
      console.log(matter(text));
      const matches = text.matchAll(/bugs/g);
      for (const match of matches) {
        const index = match.index ?? 0;
        const matchRange = [index, index + match[0].length];
        const ruleError = new RuleError("Found bugs.", {
          padding: locator.range(matchRange)
        });
        report(node, ruleError);
      }
    }
  };
}
;
//# sourceMappingURL=index.js.map