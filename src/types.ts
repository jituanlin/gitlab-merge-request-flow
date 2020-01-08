import * as fp from 'fp-ts';
import { Gitlab as GitlabClient } from 'gitlab';
import { SimpleGit } from 'simple-git/promise';

export type WorkingBranch = string;
export type TargetBranch = string;
export type ProjectId = number;
export type MrId = number;

export interface GitlabConfig {
  targetBranch: TargetBranch;
  projectId: ProjectId;
  workingBranch: WorkingBranch;
  gitlabClient: GitlabClient;
}

export interface GitConfig {
  workingBranch: WorkingBranch;
  gitClient: Pick<SimpleGit, 'push' | 'rebase'>;
}

export interface AppConfig extends GitlabConfig, GitConfig {}

export const TaskEitherStringURI = 'TaskEitherString';
export type TaskEitherStringURI = typeof TaskEitherStringURI;
export type TaskEitherString<A> = fp.taskEither.TaskEither<string, A>;
declare module 'fp-ts' {
  namespace hkt {
    export interface URItoKind<A> {
      TaskEitherString: TaskEitherString<A>;
    }
  }
}
