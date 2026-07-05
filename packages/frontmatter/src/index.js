const yaml = require('js-yaml');

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
    const { Syntax, RuleError, report, locator } = context;
    const matchingTitles = options["titles-must-match"] ?? true;
    var frontmatter;
    var titleMatched;
    return {
        ['Yaml'](node) { // "Yaml" node
            const text = node.value; // Get text
            frontmatter = yaml.load(text);
        },
        ['Header'](node) { // "Header" node
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
            }
            else if (frontmatter?.title === undefined) {
                const ruleError = new RuleError("No FrontMatter Title found to match to.");
                titleMatched = false;
                report(node, ruleError);
            }
            else {
                const ruleError = new RuleError("Header does not match FrontMatter title.");
                titleMatched = false;
                report(node, ruleError);
            }
        },
        [Syntax.DocumentExit](node) {
            if ( matchingTitles && titleMatched === undefined && frontmatter?.title !== undefined) {
                report(
                    node,
                    new RuleError("No Header matches FrontMatter title.")
                );
            }
        }
    }
};
