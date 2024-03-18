import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const extensions = ['.js', '.ts']

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'lib/bundles/bundle.esm.min.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'lib/bundles/bundle.umd.js',
      format: 'umd',
      name: 'core',
      sourcemap: true
    },
    {
      file: 'lib/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'core',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: 'bundled',
      include: ['src/**/*.ts'],
      extensions,
      exclude: './node_modules/**',
    })
  ]
}
