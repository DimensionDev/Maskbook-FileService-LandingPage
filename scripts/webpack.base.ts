import CSSPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { ROOT_PATH } from './paths';
import rules from './rules';

const configuration: webpack.Configuration = {
  context: ROOT_PATH,
  stats: 'minimal',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: { rules },
  plugins: [new CSSPlugin({ filename: '[name].css' })],
};

export default configuration;
