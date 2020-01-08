import * as simplegit from 'simple-git/promise';
import {GITLAB_HOST, GITLAB_TOKEN, PROJECT_ID, TARGET_BRANCH, WORKING_BRANCH, WORKING_DIR} from '../secret';
import { Gitlab as GitlabClient } from 'gitlab';
import * as fp from 'fp-ts';
import { Lazy } from 'fp-ts/es6/function';
import { AppConfig } from './types';

export const getMessageOfError = (label:string)=> (error: any) => `[${label}]: ${error.message}`;

export const APP_CONFIG: AppConfig = {
  targetBranch: TARGET_BRANCH,
  gitlabClient: new GitlabClient({
    token: GITLAB_TOKEN,
    host: GITLAB_HOST,
  }),
  workingBranch: WORKING_BRANCH,
  projectId: PROJECT_ID,
  gitClient: simplegit(WORKING_DIR),
};
