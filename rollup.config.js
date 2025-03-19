import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/module.js',
  output: [
    {
      file: 'dist/md-to-cn-word.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/md-to-cn-word.umd.js',
      format: 'umd',
      name: 'MdToCnWord',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ],
  external: ['cheerio', 'html-to-docx', 'showdown']
}; 