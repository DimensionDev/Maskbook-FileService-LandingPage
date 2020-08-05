import { loader as TypedCSSLoader } from '@nice-labs/typed-css-modules';
import CSSPlugin from 'mini-css-extract-plugin';
import { Rule } from 'webpack';

const TSRule: Rule = {
  test: /\.tsx?$/,
  loader: require.resolve('ts-loader'),
  options: { allowTsInNodeModules: true },
};

const CSSRule: Rule = {
  test: /\.css$/,
  use: [CSSPlugin.loader, require.resolve('css-loader')],
};

const SCSSRule: Rule = {
  test: /\.scss$/,
  use: [
    CSSPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: { modules: true },
    },
    {
      loader: TypedCSSLoader,
      options: { mode: 'local' },
    },
    require.resolve('sassjs-loader'),
  ],
};

const rules: Rule[] = [TSRule, CSSRule, SCSSRule];

export default rules;
