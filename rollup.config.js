import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import svg from 'rollup-plugin-vue-inline-svg'
export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
      babel({
        presets: ['@vue/babel-preset-jsx'],
      }),
      vue(),
      postcss(),
    ],
    external: [
      'vue',
      /ant-design-vue/,
      'vue-emotion',
      'lodash',
      'flat',
      'dlv',
      'vue-popperjs',
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/design-system/umd/design-system.js',
        format: 'umd',
        name: 'design-system',
      },
    ],
    plugins: [
      svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
      babel({
        presets: ['@vue/babel-preset-jsx'],
      }),
      vue(),
      postcss(),
    ],
  },
]
