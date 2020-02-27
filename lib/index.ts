#!./node_modules/ts-node/dist/bin.js

import { main } from './main';
import * as fp from 'fp-ts';

main({
  configLocation: process.argv[3],
  usingConfigName: process.argv[2],
})().then(r =>
  fp.either.fold(
    (reason: string) => console.log(`run gitlab flow fail:`, reason),
    () => console.log('run gitlab flow success')
  )(r)
);
