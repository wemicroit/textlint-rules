const yaml = require("js-yaml");

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, locator } = context;
  const matchingTitles = options["title-must-match-h1"] ?? false;
  const differingTitles = options["title-must-differ-linkTitle"] ?? false;
  const propertyOrder = options["ordered-properties"] ?? [];
  const requireOrdered = options["require-ordered-properties"] ?? false;
  var frontmatter;
  var docHeader;
  var initialHeader;
  return {
    ["Yaml"](node) {
      // "Yaml" node
      const text = node.value; // Get text
      frontmatter = yaml.load(text);

      if (matchingTitles && frontmatter?.title === undefined) {
        const ruleError = new RuleError("FrontMatter title is missing.");
        report(node, ruleError);
      }
      if (
        differingTitles &&
        frontmatter?.title !== undefined &&
        frontmatter.title === frontmatter.linkTitle
      ){
        const ruleError = new RuleError(
          `FrontMatter title & linkTitle are both ${frontmatter.title} when expected to differ. Either change value or remove the linkTitle frontmatter property.`);
        report(node, ruleError);
      }
      if (propertyOrder.length === 0) {
        return;
      }
      const actual = Object.keys(frontmatter);
      var skipped = 0;
      for (var i = 0; i < propertyOrder.length; i++) {
        var position = actual.indexOf(propertyOrder[i]);
        if (position === -1 && requireOrdered) {
          const ruleError = new RuleError(
            `Missing required property: ${propertyOrder[i]}`,
          );
          report(node, ruleError);
        } else if (position === -1 && !requireOrdered) {
          skipped++;
        } else if (position !== i - skipped) {
          const ruleError = new RuleError(
            `Property ${propertyOrder[i]} is out of order. Expected position: ${i - skipped}, Actual position: ${position}`,
          );
          report(node, ruleError);
        }
      }
    },
    ["Header"](node) {
      // "Header" node
      if (node.depth === 1 && initialHeader === undefined) {
        docHeader = node.children.find((c) => c.type === "Str")?.value ?? ""; // Get text
        initialHeader = true;
      }
      if (
        matchingTitles &&
        initialHeader &&
        frontmatter?.title !== undefined &&
        docHeader.trim() !== frontmatter.title.trim()
      ) {
        const ruleError = new RuleError(
          `Header ${docHeader.trim()} does not match FrontMatter title. Expected header: ${frontmatter?.title}`,
        );
        report(node, ruleError);
      }
      initialHeader = false;
    },
    [Syntax.DocumentExit](node) {
      if (matchingTitles && docHeader === undefined) {
        report(node, new RuleError("No H1 Header found."));
      }
      if (matchingTitles && frontmatter === undefined) {
        const ruleError = new RuleError("FrontMatter title is missing.");
        report(node, ruleError);
      }
    },
  };
}
