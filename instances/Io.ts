import { Git, Gitlab, Program } from '../ADT';
import * as fp from 'fp-ts';
import { AppConfig, MrId, WorkingBranch } from '../types';

export const programIo: Program<fp.io.URI> = {
  ...fp.io.io,
  finish: fp.io.io.of,
};

export const gitIo: Git<fp.io.URI> = {
  rebase: (branch: WorkingBranch) => fp.console.log(`git rebase ${branch}`),
  push: (branch: WorkingBranch) => fp.console.log(`git push ${branch}`),
};

export const gitlabIo: Gitlab<fp.io.URI> = {
  createMr: (appConfig: AppConfig) =>
    fp.pipeable.pipe(
      fp.console.log(`gitlab createMr with option ${JSON.stringify(appConfig)}`),
      fp.io.map(() => 42)
    ),
  mergeMr: (mrId: MrId) => (appConfig: AppConfig) =>
    fp.console.log(`gitlab mergeMr with option ${JSON.stringify(appConfig)} and mrId ${mrId}`),
};
