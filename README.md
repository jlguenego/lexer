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
const blank = Lexer.createToken({
  name: 'blank',
  pattern: /\s+/,
  ignore: true,
});
const keywords = Lexer.createKeywordTokens(['var']);
const operators = Lexer.createOperatorTokens([
  {
    name: 'equal',
    pattern: '=',
  },
]);
const separators = Lexer.createSeparatorTokens([
  {
    name: 'semi-column',
    pattern: ';',
  },
]);
const identifier = Lexer.createToken({
  name: 'identifier',
  pattern: /\w+/,
  group: Group.IDENTIFIER,
});

// the order is important. Token are applied from first to last.
const tokens = [blank, ...keywords, ...operators, ...separators, identifier];

// Do the job.
const tokenSequence = new Lexer(tokens).tokenize(str);

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
  {
    name: 'identifier',
    value: '3',
    group: 'identifier',
    position: {col: 9, line: 2},
  },
  {
    name: 'semi-column',
    value: ';',
    group: 'separator',
    position: {col: 10, line: 2},
  },
  {
    name: 'var',
    value: 'var',
    group: 'keyword',
    position: {col: 1, line: 3},
  },
  {
    name: 'identifier',
    value: 'y',
    group: 'identifier',
    position: {col: 5, line: 3},
  },
  {
    name: 'equal',
    value: '=',
    group: 'operator',
    position: {col: 7, line: 3},
  },
  {
    name: 'identifier',
    value: '52',
    group: 'identifier',
    position: {col: 9, line: 3},
  },
  {
    name: 'semi-column',
    value: ';',
    group: 'separator',
    position: {col: 11, line: 3},
  },
];
```

## Other Examples

- Monoline comment.

## TODO

- Refactor token in rules
- Test comment : monoline, multiline.
- Explain how it is working.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
