import * as fp from 'fp-ts';

export type WorkingBranch = string;
type TargetBranch = string;
type ProjectId = number;
export type MrId = number;

export interface AppConfig {
  workingBranch: WorkingBranch;
  targetBranch: TargetBranch;
  projectId: ProjectId;
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
