import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.plugins('eslint-plugin-react-compiler'),
  { ignores: ['.next/*'] },
];

export default config;
