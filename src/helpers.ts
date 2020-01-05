import * as simplegit from 'simple-git/promise';
import {GITLAB_HOST, GITLAB_TOKEN, PROJECT_ID, TARGET_BRANCH, WORKING_BRANCH} from "../secret";
import {Gitlab as GitlabClient} from "gitlab";

export const gitClient = simplegit();

export const getMessageOfError = (error: any) => error.message;

export const GITLAB_CONFIG = {
    targetBranch: TARGET_BRANCH,
    gitlabClient: new GitlabClient({
        token: GITLAB_TOKEN,
        host: GITLAB_HOST,
    }),
    workingBranch: WORKING_BRANCH,
    projectId: PROJECT_ID,
}