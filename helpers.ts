import { Gitlab as GitlabClientFactory } from 'gitlab';
import * as simplegit from 'simple-git/promise';
import { GITLAB_HOST, GITLAB_TOKEN } from './secret';

export const gitClient = simplegit();

export const gitlabClient = new GitlabClientFactory({
  token: GITLAB_TOKEN,
  host: GITLAB_HOST,
});

export const getMessageOfError = (error: any) => error.message;
