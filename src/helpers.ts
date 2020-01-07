import * as simplegit from 'simple-git/promise';
import { GITLAB_HOST, GITLAB_TOKEN, PROJECT_ID, TARGET_BRANCH, WORKING_BRANCH } from '../secret';
import { Gitlab as GitlabClient } from 'gitlab';
import * as fp from 'fp-ts';
import { Lazy } from 'fp-ts/es6/function';

export const gitClient = simplegit();

export const getMessageOfError = (error: any) => error.message;

export const taskEitherTryOrErrorMessage = <A>(f: Lazy<Promise<A>>) =>
  fp.taskEither.tryCatch(f, getMessageOfError);

export const GITLAB_CONFIG = {
  targetBranch: TARGET_BRANCH,
  gitlabClient: new GitlabClient({
    token: GITLAB_TOKEN,
    host: GITLAB_HOST,
  }),
  workingBranch: WORKING_BRANCH,
  projectId: PROJECT_ID,
};
