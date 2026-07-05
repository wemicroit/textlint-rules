const yaml = require('js-yaml');

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
    const { Syntax, RuleError, report, locator } = context;
    const matchingTitles = options["titles-must-match"] ?? true;
    const propertyOrder = options["property-order"] ?? [];
    var frontmatter;
    var titleMatched;
    return {
        ['Yaml'](node) { // "Yaml" node
            const text = node.value; // Get text
            frontmatter = yaml.load(text);
            const actual = Object.keys(frontmatter);
            const expected = [...propertyOrder, ...actual.filter(k => !propertyOrder.includes(k))];
            const mismatches = propertyOrder.length > 0 ? actual
              .map((key, i) => ({ key, i, expected: expectedOrder[i] }))
              .filter(x => x.key !== x.expected) : [];
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
