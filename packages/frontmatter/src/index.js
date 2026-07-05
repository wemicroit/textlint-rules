const matter = require('gray-matter');

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
    const { Syntax, RuleError, report, locator } = context;
    const matchingTitles = options["titles-must-match"] ?? true;
    var fmTitle;
    var titleMatched;
    return {
        ['Yaml'](node) { // "Yaml" node
            const text = node.raw; // Get text
            fmTitle = matter(text).data.title;
        },
        ['Header'](node) { // "Header" node
            if (node.depth !== 1) {
                return;
            }
            const text = node.children[0]?.raw; // Get text
            if (!matchingTitles) {
                return;
            }
            if (text === fmTitle) {
                titleMatched = true;
                return;
            }
            else if (fmTitle === undefined) {
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
            if ( matchingTitles && titleMatched === undefined && fmTitle !== undefined) {
                report(
                    node,
                    new RuleError("No Header matches FrontMatter title.")
                );
            }
        }
    }
};
