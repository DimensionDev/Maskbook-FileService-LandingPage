import production from './scripts/webpack.production';
import development from './scripts/webpack.development';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return production;
  }
  return development;
};
