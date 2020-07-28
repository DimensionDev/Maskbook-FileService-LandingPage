import HTMLPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import { TEMPLATE_PATH } from './paths';
import configuration from './webpack.base';

const signed = [
  'bgHCQ8zsHHIAnUKohXr5Hic1vHDUryKnHdXZCvrrMss=',
  'AVdyDPVVvgGkjf18UN1koH2Ud1a/00KP2HMd2QSTbqhVmrWrfrtNnVYhS3pl4Ra8WjvSHDoARXEcDCHcul+tZw==',
];

const files: Record<string, any> = {
  // https://arweave.net/TcbvuqNzaGpj7xpIeXqA482j3XB1E39Ifb5bUlCFwUs#sample
  png: {
    name: 'sample.png',
    size: 2964729,
    link: 'https://arweave.net/KTjMVrmsm4wkLjEFpCFb7esgqwFJUJdu88JbCLTQbjE',
    signed,
  },
  // https://arweave.net/xgZ1DFJ7HMslUfF7wzBQ5YRSrsjAfPqQP33tzhOLt1A#sample
  mp3: {
    name: 'Hibari.mp3',
    size: 4401742,
    link: 'https://arweave.net/QUcXQi_7OJlB30b0iUUxU6S5x8siaEe9jZKV0JP7vBI',
    signed,
  },
  // https://arweave.net/9JgBCn8uaToqiTbugQ43yRuQioLbvbeTA5mSLEbnYt8#sample
  mp4: {
    name: '1 minute countdown.mp4',
    size: 8726412,
    link: 'https://arweave.net/1jZr8LSgALJmK7IjsQg5IBDyJakYQq9c7Q0SEfFp_6M',
    signed,
  },
  // https://arweave.net/307hbRQY_nKIrJZP6MxGemQd25F8NnTQHAuAlzN3XaI#sample
  txt: {
    name: '三体.txt',
    size: 1715876,
    link: 'https://arweave.net/KNU70YZBV87_tJFdxzkJaTM0jO_rncSm8OZ3v_AvWAQ',
    signed,
  },
  // https://arweave.net/PWvhvpaoHNPOhSCyW-e_jRqgPEESELEy8T69AjTlcYk#sample
  pdf: {
    name: 'sample.pdf',
    size: 1042157,
    link: 'https://arweave.net/3xDm5oErjbqv1hk4EeNkbcmtzRp2C3g80SB5ZOEumzw',
    signed,
  },
  empty: {
    name: 'random.1kib',
    size: 1024,
    link: 'https://arweave.net/moF2ekddWoLAAODwLQkMLDJX1nWE2D_p487zmPQ9xWQ',
    signed: null,
    createdAt: '2020-07-29T14:49:11.548Z',
  },
};

const plugins = Object.keys(files).map(
  (name) =>
    new HTMLPlugin({
      filename: `${name}.html`,
      title: 'Maskbook File Service | Arweave',
      inject: 'head',
      template: TEMPLATE_PATH,
      templateParameters: { metadata: JSON.stringify(files[name]) },
    }),
);

export default merge(configuration, {
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: false,
    https: true,
    inline: false,
  },
  plugins,
});
