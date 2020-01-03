import {Git, Gitlab, Program} from '../ADT';
import {GitlabConfig, TaskEitherStringURI, WorkingBranch} from '../types';
import * as fp from 'fp-ts';
import * as R from 'ramda';
import {getMessageOfError, gitClient} from '../helpers';

export const programTaskEitherString: Program<TaskEitherStringURI> = {
    ...fp.taskEither.taskEither,
    finish: fp.taskEither.taskEither.of,
    URI: TaskEitherStringURI,
};

export const gitTaskEitherString: Git<TaskEitherStringURI> = {
    rebase: (branch: WorkingBranch) =>
        fp.taskEither.tryCatch(async () => {
            await gitClient.rebase([branch]);
        }, getMessageOfError),
    push: (branch: WorkingBranch) =>
        fp.taskEither.tryCatch(async () => {
            await gitClient.push('origin', branch);
        }, getMessageOfError),
};

export const gitlabTaskEitherString: Gitlab<TaskEitherStringURI> = {
    createMr: (gitlabConfig: GitlabConfig) =>
        fp.taskEither.tryCatch(async () => {
            const response = await gitlabConfig.gitlabClient.MergeRequests.create(
                gitlabConfig.projectId,
                gitlabConfig.workingBranch,
                gitlabConfig.targetBranch,
                `merge ${gitlabConfig.workingBranch} to ${gitlabConfig.targetBranch}`
            );
            return R.path(['iid'], response) as number;
        }, getMessageOfError),
    mergeMr: mrId => gitlabConfig =>
        fp.taskEither.tryCatch(async () => {
            await gitlabConfig.gitlabClient.MergeRequests.accept(gitlabConfig.projectId, mrId);
        }, getMessageOfError),
};
