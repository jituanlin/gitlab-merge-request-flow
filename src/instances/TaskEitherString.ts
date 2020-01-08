import { Git, Gitlab, Program } from '../ADT';
import { AppConfig, TaskEitherStringURI } from '../types';
import * as fp from 'fp-ts';
import * as R from 'ramda';
import { getMessageOfError } from '../helpers';

export const programTaskEitherString: Program<TaskEitherStringURI> = {
  ...fp.taskEither.taskEither,
  finish: fp.taskEither.taskEither.of,
  URI: TaskEitherStringURI,
};

export const gitTaskEitherString: Git<TaskEitherStringURI> = {
  rebase: gitConfig =>
    fp.taskEither.tryCatch(async () => {
      await gitConfig.gitClient.rebase([gitConfig.workingBranch]);
    }, getMessageOfError('git rebase')),
  push: gitConfig =>
    fp.taskEither.tryCatch(async () => {
      await gitConfig.gitClient.push('origin', gitConfig.workingBranch);
    }, getMessageOfError('git push')),
};

export const gitlabTaskEitherString: Gitlab<TaskEitherStringURI> = {
  createMr: (gitlabConfig: AppConfig) =>
    fp.taskEither.tryCatch(async () => {
      const response = await gitlabConfig.gitlabClient.MergeRequests.create(
        gitlabConfig.projectId,
        gitlabConfig.workingBranch,
        gitlabConfig.targetBranch,
        `merge ${gitlabConfig.workingBranch} to ${gitlabConfig.targetBranch}`
      );
      return R.path(['iid'], response) as number;
    }, getMessageOfError('create merge request')),
  mergeMr: mrId => gitlabConfig =>
    fp.taskEither.tryCatch(async () => {
      await gitlabConfig.gitlabClient.MergeRequests.accept(gitlabConfig.projectId, mrId);
    }, getMessageOfError('merge request')),
};
