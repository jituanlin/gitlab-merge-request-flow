import {ProjectId, TargetBranch, WorkingBranch} from '../src/types';

export interface LibConfig {
  configLocation: string;
  usingConfigName: string;
}


export type GitlabToken = string;
export type GitlabHost = string;

export interface AppConfig {
  workingBranch: WorkingBranch;
  targetBranch: TargetBranch;
  projectId: ProjectId;
  gitlabToken: GitlabToken;
  gitlabHost: GitlabHost;
}
