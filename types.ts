import * as fp from 'fp-ts';
import {Gitlab as GitlabClient} from 'gitlab';

export type WorkingBranch = string;
type TargetBranch = string;
type ProjectId = number;
export type MrId = number;

export interface GitlabConfig {
  workingBranch: WorkingBranch;
  targetBranch: TargetBranch;
  projectId: ProjectId;
  gitlabClient: GitlabClient;
}

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
