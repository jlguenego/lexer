# Lexer

Lexical Analyzer.

https://en.wikipedia.org/wiki/Lexical_analysis

## Install

```
npm i @jlguenego/lexer
```

## Usage

```js
const {Lexer, Group} = require('@jlguenego/lexer');

// Source code to tokenize.
const str = `
var x = 3;
var y = 52;
`;

// declare all the language token.
const blank = new Rule({
  name: 'blank',
  pattern: /\s+/,
  ignore: true,
});

const keywords = Rule.createKeywordRules(['var']);

const operators = Rule.createGroupRules(Group.OPERATOR, [
  {
    name: 'equal',
    pattern: '=',
  },
]);

const separators = Rule.createGroupRules(Group.SEPARATOR, [
  {
    name: 'semi-column',
    pattern: ';',
  },
]);

const identifier = new Rule({
  name: 'identifier',
  pattern: /\w+/,
  group: Group.IDENTIFIER,
});

// the order is important. Token are applied from first to last.
const rules = [blank, ...keywords, ...operators, ...separators, identifier];

// Do the job.
const tokenSequence = new Lexer(rules).tokenize(str);

// print the output.
console.log('tokenSequence: ', tokenSequence);
```

This produces the following output:

```js
tokenSequence: [
  {
    name: 'var',
    value: 'var',
    group: 'keyword',
    position: {col: 1, line: 2},
  },
  {
    name: 'identifier',
    value: 'x',
    group: 'identifier',
    position: {col: 5, line: 2},
  },
  {
    name: 'equal',
    value: '=',
    group: 'operator',
    position: {col: 7, line: 2},
  },
  // ...
];
```

## Understanding with examples

- First see the [mocha test](./test/).
- ASN.1 language
- Javascript language
- JSON language
- TOML language

## Concepts

This module purpose is to tokenize a source code input.
In compurter science, this process is known under the term
[lexical analysis](https://en.wikipedia.org/wiki/Lexical_analysis).
We call it also a **lexer**.

The above `const tokenSequence = new Lexer(rules).tokenize(str);` instruction
applies `rules` to tokenize a source string `str`.

The rules are specified according the language and applied according a regular expression given in `rule.pattern`.

During tokenization we define by the word **state** the source code being tokenized.
The state is an array of source code fragment, called **source element** and recognized **token**.
At the beginning the state is an array of one **source element** reflecting the entire source code.
At the end the state must be an array of only tokens, otherwise the source code is not respecting the syntax.

Normally, the source code is tokenized from the beginning to the end of the string.
But tokenizing can be faster if instead of looking from the beginning to the end,
we choose to apply successively one rule after another to the current state.
The drawback is that certains rules (for instance string, comment) cannot be well
correctly tokenized if they are nested together.

Therefore this lexer do both algorithm successively:

1. Preprocessing: performs the slow and robust method with only the rules marked as preprocess flag.
2. Main: performs the fast way: applying the rules one after the other to the state.

The recommandation is to mark a rule with the preprocess flag only if the
main phase cannot apply the rule correctly.

The main phase applies one rule after the other. This means that the order of rules are important.
For instance, the keyword rules should be applied from the longest one to the shortest one.
The most generic one (identifer, type, etc.) must be applied with very low priority,
so it is recommanded to place them at the end of the rule list.

## TODO

- Explain how it is working.
- ESM module
- Refactor with rafactoring.guru

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
