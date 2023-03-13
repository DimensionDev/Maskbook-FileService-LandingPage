import CSSPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { ROOT_PATH } from './paths';
import rules from './rules';
import git from '@nice-labs/git-rev';

const configuration: webpack.Configuration = {
  context: ROOT_PATH,
  stats: 'minimal',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: { rules },
  plugins: [
    new CSSPlugin({ filename: '[name].css' }),
    new webpack.EnvironmentPlugin({
      COMMIT_HASH: git.commitHash(true),
      COMMIT_DATE: git.commitDate(),
      PREVIEW: process.env.PREVIEW,
    }),
  ],
};

export default configuration;
