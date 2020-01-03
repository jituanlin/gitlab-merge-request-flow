import { Git, Gitlab, Program } from '../ADT';
import { AppConfig, TaskEitherStringURI, WorkingBranch } from '../types';
import * as fp from 'fp-ts';
import * as R from 'ramda';
import { getMain } from '../getMain';
import { getMessageOfError, gitClient, gitlabClient } from '../helpers';

const programTaskEitherString: Program<TaskEitherStringURI> = {
  ...fp.taskEither.taskEither,
  finish: fp.taskEither.taskEither.of,
  URI: TaskEitherStringURI,
};
const gitTaskEitherString: Git<TaskEitherStringURI> = {
  rebase: (branch: WorkingBranch) =>
    fp.taskEither.tryCatch(async () => {
      await gitClient.rebase([branch]);
    }, getMessageOfError),
  push: (branch: WorkingBranch) =>
    fp.taskEither.tryCatch(async () => {
      await gitClient.push('origin', branch);
    }, getMessageOfError),
};
const gitlabTaskEitherString: Gitlab<TaskEitherStringURI> = {
  createMr: (appConfig: AppConfig) =>
    fp.taskEither.tryCatch(async () => {
      const response = await gitlabClient.MergeRequests.create(
        appConfig.projectId,
        appConfig.workingBranch,
        appConfig.targetBranch,
        `merge ${appConfig.workingBranch} to ${appConfig.targetBranch}`
      );
      return R.path(['iid'], response) as number;
    }, getMessageOfError),
  mergeMr: mrId => appConfig =>
    fp.taskEither.tryCatch(async () => {
      await gitlabClient.MergeRequests.accept(appConfig.projectId, mrId);
    }, getMessageOfError),
};
export const mainTaskEitherString = getMain({
  ...programTaskEitherString,
  ...gitTaskEitherString,
  ...gitlabTaskEitherString,
});
