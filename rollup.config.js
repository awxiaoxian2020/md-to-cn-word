import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: 'src/module.js',
  output: [
    {
      file: 'dist/md-to-cn-word.esm.js',
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/md-to-cn-word.umd.js',
      format: 'umd',
      name: 'MdToCnWord',
      sourcemap: true,
    },
    {
      file: 'dist/md-to-cn-word.min.js',
      format: 'umd',
      name: 'MdToCnWord',
      plugins: [terser()],
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    json(),
    nodePolyfills(),
    builtins()
  ],
} 