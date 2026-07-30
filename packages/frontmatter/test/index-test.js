import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    // no problem
    {
      inputPath: "test/data/README.md",
    },
    {
      inputPath: "test/data/model.txt",
    },
    {
      inputPath: "README.md",
      options: {
        "exclude-paths": ["README.md"],
      },
    },
    {
      text: "---\ntitle: test heading\n---\n\n # test heading \n\n ## test heading2",
    },
    {
      text: '---\ntitle: OpenTelemetry Semantic Conventions\n---\n\n# <img src="https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png" alt="OpenTelemetry Icon" width="45" height=""> OpenTelemetry Semantic Conventions',
    },
    {
      text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
    },
    {
      text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "title-must-match-h1": false,
      },
    },
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "ordered-properties": ["title"],
        "title-must-match-h1": false,
      },
    },
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\nrandom: value\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "title-must-match-h1": false,
      },
    },
    {
      text: "---\ntitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "require-ordered-properties": false,
        "title-must-match-h1": false,
      },
    },
    {
      text: "---\ntitle: title\nlinkTitle: link\n---\n\n # test",
      options: {
        "title-must-differ-linkTitle": true,
      },
    },
    {
      text: "---\ntitle: title\nlinkTitle: title\n---\n\n # test",
      options: {
        "title-must-differ-linkTitle": false,
      },
    },
  ],
  invalid: [
    {
      inputPath: "test/data/plain.md",
      errors: [
        {
          message: "FrontMatter is missing.",
        },
      ],
    },
    {
      text: "---\ntitle: test heading2\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "title-must-match-h1": true,
      },
      errors: [
        {
          message:
            "Header test heading does not match FrontMatter title. Expected header: test heading2",
        },
      ],
    },
    {
      text: "---\ntitle: test heading\n---\n\n",
      options: {
        "title-must-match-h1": true,
      },
      errors: [
        {
          message: "No H1 Header found.",
        },
      ],
    },
    {
      text: "---\ntitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "require-ordered-properties": true,
        "title-must-match-h1": false,
      },
      errors: [
        {
          message: "Missing required property: linkTitle",
        },
      ],
    },
    {
      text: "---\nlinkTitle: test heading\ntitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "title-must-match-h1": false,
      },
      errors: [
        {
          message:
            "Property title is out of order. Expected position: 0, Actual position: 1",
        },
        {
          message:
            "Property linkTitle is out of order. Expected position: 1, Actual position: 0",
        },
      ],
    },
    {
      text: "---\ntitle: test heading\nextra: text \nlinkTitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "require-ordered-properties": false,
        "title-must-match-h1": false,
      },
      errors: [
        {
          message:
            "Property linkTitle is out of order. Expected position: 1, Actual position: 2",
        },
      ],
    },
    {
      text: "---\ntitle: test heading\nextra: text \nlinkTitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["linkTitle"],
        "require-ordered-properties": false,
        "title-must-match-h1": false,
      },
      errors: [
        {
          message:
            "Property linkTitle is out of order. Expected position: 0, Actual position: 2",
        },
      ],
    },
    {
      text: "---\ntitle: test heading\nextra: text \nlinkTitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title", "linkTitle"],
        "require-ordered-properties": true,
        "title-must-match-h1": false,
      },
      errors: [
        {
          message:
            "Property linkTitle is out of order. Expected position: 1, Actual position: 2",
        },
      ],
    },
    {
      text: "---\nlinkTitle: test heading\ntitle: test heading\n---\n\n",
      options: {
        "ordered-properties": ["title"],
        "title-must-match-h1": false,
      },
      errors: [
        {
          message:
            "Property title is out of order. Expected position: 0, Actual position: 1",
        },
      ],
    },
    {
      text: "# test heading",
      options: {
        "title-must-match-h1": true,
      },
      errors: [
        {
          message: "FrontMatter is missing.",
        },
      ],
    },
    {
      text: "---\ntitle: title\nlinkTitle: title\n---\n\n # test",
      options: {
        "title-must-differ-linkTitle": true,
      },
      errors: [
        {
          message:
            "FrontMatter title & linkTitle are both title when expected to differ. Either change value or remove the linkTitle frontmatter property.",
        },
      ],
    },
  ],
});
