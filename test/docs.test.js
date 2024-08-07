import { describe, it, expect } from 'vitest';
import chroma_ from '../index.js';
import fs from 'fs';

const DOCS = fs.readFileSync(__dirname + '/../docs/src/index.md', 'utf-8');

const snippets = DOCS.match(/^```js$\n(^[^`].+$\n)+/gm).map((s) => s.split('\n').slice(1).join('\n'));

// is used in eval;
const data = [2.0, 3.5, 3.6, 3.8, 3.8, 4.1, 4.3, 4.4, 4.6, 4.9, 5.2, 5.3, 5.4, 5.7, 5.8, 5.9, 6.2, 6.5, 6.8, 7.2, 8];

describe('Tests all snippets in the documentation', () => {
    // referenced in code snippets
    let colors, f, c;

    snippets.forEach((code, i) => {
        if (code.indexOf('function') > -1 || code.indexOf('### ') > -1) return;

        it(`run code snippet ${i}`, () => {
            expect(() => {
                const chroma = chroma_;
                eval(code);
            }).not.toThrow();
        });
    });
});
