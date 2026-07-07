const yaml = require("js-yaml");

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, locator } = context;
  const matchingTitles = options["title-must-match-h1"] ?? true;
  const propertyOrder = options["ordered-properties"] ?? [];
  var frontmatter;
  var titleMatched;
  return {
    ["Yaml"](node) {
      // "Yaml" node
      const text = node.value; // Get text
      frontmatter = yaml.load(text);
      if (propertyOrder.length === 0) {
        return;
      }
      const actual = Object.keys(frontmatter);
      for (var i = 0; i < propertyOrder.length; i++) {
        var position = actual.indexOf(propertyOrder[i]);
        if (position === -1) {
          const ruleError = new RuleError(
            `Missing required property: ${propertyOrder[i]}.`,
          );
          report(node, ruleError);
        } else if (position !== i) {
          const ruleError = new RuleError(
            `Property ${propertyOrder[i]} is out of order. Expected position: ${i}, Actual position: ${position}.`,
          );
          report(node, ruleError);
        }
      }
    },
    ["Header"](node) {
      // "Header" node
      if (node.depth !== 1) {
        return;
      }
      const text = node.children[0]?.raw; // Get text
      if (!matchingTitles) {
        return;
      }
      if (text === frontmatter?.title) {
        titleMatched = true;
        return;
      } else if (frontmatter?.title === undefined) {
        const ruleError = new RuleError(
          "No FrontMatter Title found to match to.",
        );
        titleMatched = false;
        report(node, ruleError);
      } else {
        const ruleError = new RuleError(
          "Header does not match FrontMatter title.",
        );
        titleMatched = false;
        report(node, ruleError);
      }
    },
    [Syntax.DocumentExit](node) {
      if (
        matchingTitles &&
        titleMatched === undefined &&
        frontmatter?.title !== undefined
      ) {
        report(node, new RuleError("No Header matches FrontMatter title."));
      }
    },
  };
}
