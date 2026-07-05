import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        {
            text: "---\ntitle: test heading\n---\n\n # test heading \n\n ## test heading2",
        },
        {
            text: "## test heading",
        },
        {
            text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
            options: {
                "titles-must-match": false
            }
        },
        {
            text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
            options: {
                "property-order": ["title"]
            }
        }
    ],
    invalid: [
        {
            text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
            options: {
                "titles-must-match": true
            },
            errors: [
                {
                    message: "Header does not match FrontMatter title.",
                }
            ]
        },
        {
            text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
            errors: [
                {
                    message: "Header does not match FrontMatter title.",
                }
            ]
        },
        {
            text: "---\ntitle: test heading\n---\n\n # test heading2",
            errors: [
                {
                    message: "Header does not match FrontMatter title.",
                }
            ]
        },
        {
            text: "---\ntitle: test heading\n---\n\n",
            errors: [
                {
                    message: "No Header matches FrontMatter title.",
                }
            ]
        },
        {
            text: "---\ntitle: test heading\n---\n\n",
            options: {
                "property-order": ["title", "linkTitle"]
            },
            errors: [
                {
                    message: "FrontMatter property in wrong order/missing.",
                }
            ]
        },
        {
            text: "# test heading",
            errors: [
                {
                    message: "No FrontMatter Title found to match to.",
                }
            ]
        }
    ]
});
