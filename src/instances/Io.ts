import * as fp from 'fp-ts';

import { Git, Gitlab, Program } from '../ADT';
import { MrId } from '../types';

export const programIo: Program<fp.io.URI> = {
  ...fp.io.io,
  finish: fp.io.io.of,
};

export const gitIo: Git<fp.io.URI> = {
  rebase: gitConfig => fp.console.log(`git rebase ${gitConfig.workingBranch}`),
  push: gitConfig => fp.console.log(`git push ${gitConfig.workingBranch}`),
};

export const gitlabIo: Gitlab<fp.io.URI> = {
  createMr: (appConfig) =>
    fp.pipeable.pipe(
      fp.console.log(`gitlab createMr with option ${JSON.stringify(appConfig)}`),
      fp.io.map(() => 42)
    ),
  mergeMr: (mrId: MrId) => (appConfig) =>
    fp.console.log(`gitlab mergeMr with option ${JSON.stringify(appConfig)} and mrId ${mrId}`),
};
