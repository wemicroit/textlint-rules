import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    // no problem
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": false,
        "properties": ["title", "linkTitle"],
        "required-properties": ["title", "linkTitle"],
      },
    },
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": false,
        "properties": ["title", "linkTitle"],
        "required-properties": ["title"],
      },
    },
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": false,
        "properties": ["title", "linkTitle"],
      },
    },
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": true,
        "properties": ["title"],
        "required-properties": ["title"],
      },
    },
  ],
  invalid: [
    {
      text: "---\ntitle: test heading2\nlinkTitle: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": false,
        "properties": ["title"],
        "required-properties": ["title"],
      },
      errors: [
        {
          message: "Property \"linkTitle\" is not expected to be here",
        },
      ],
    },
    {
      text: "---\ntitle: test heading2\nrandom: link\n---\n\n # test heading \n\n ## test heading2",
      options: {
        "additional-properties": false,
        "properties": ["title", "linkTitle"],
        "required-properties": ["title", "linkTitle"],
      },
      errors: [
        {
          message: "Object must have required property \"linkTitle\"",
        },
        {
          message: "Property \"random\" is not expected to be here",
        },
      ],
    },
  ],
});
