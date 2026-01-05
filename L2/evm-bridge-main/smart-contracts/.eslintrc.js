// SPDX-License-Identifier: MIT
//
// The MIT License (MIT)
// 
// Copyright (c) 2025 AIR Institute and BISITE (USAL)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
      "prefer-spread": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "no-console": 0,
      "no-async-promise-executor": 0,
      "only-arrow-functions": 0,
      "interface-name": 0,
      "no-empty": 0,
      "max-line-length": 0,
      "max-classes-per-file": 0,
      "eqeqeq": 2,
      "semi": 1,
      "indent": ["error", 4, { "SwitchCase": 1 }],
      "no-var-requires": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/camelcase": 0,
      "object-literal-sort-keys": 0,
      "no-useless-escape": 0,
      "@typescript-eslint/no-unused-vars": ["error", {
        "caughtErrors": "none",
        "args": "none",
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-use-before-define": 0,
  },
};