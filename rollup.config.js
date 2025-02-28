import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/browser.js',
    output: [
      {
        file: 'dist/md-to-cn-word.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/md-to-cn-word.min.js',
        format: 'esm',
        plugins: [terser()],
        sourcemap: true
      },
      {
        file: 'dist/md-to-cn-word.umd.js',
        format: 'umd',
        name: 'mdToCnWord',
        sourcemap: true
      },
      {
        file: 'dist/md-to-cn-word.umd.min.js',
        format: 'umd',
        name: 'mdToCnWord',
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [
      nodeResolve({
        browser: true
      })
    ]
  },
  
  {
    input: 'src/extension.js',
    output: [
      {
        file: 'dist/md-to-cn-word.extension.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/md-to-cn-word.extension.min.js',
        format: 'esm',
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [
      nodeResolve({
        browser: true
      })
    ]
  }
]; 