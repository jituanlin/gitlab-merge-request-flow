import * as fp from 'fp-ts';
import { promises as fsPromises } from 'fs';
import { DEFAULT_CONFIG_FILE_LOCATION } from './configs';
import { getMessageOfError } from '../src/helpers';
import { AppConfig, LibConfig } from './types';
import { GitlabConfig } from '../src/types';
import { taskEitherMain } from '../src/mains/TaskEitherString';
import { Gitlab as GitlabClient } from 'gitlab';

const readConfig: fp.readerTaskEither.ReaderTaskEither<string, string, JSON> = (
  configLocation: string = DEFAULT_CONFIG_FILE_LOCATION
) =>
  fp.pipeable.pipe(
    fp.taskEither.tryCatch(() => fsPromises.readFile(configLocation), getMessageOfError),
    fp.taskEither.chain((bf: Buffer) =>
      fp.taskEither.fromIOEither(
        fp.ioEither.tryCatch(() => JSON.parse(bf.toString()), getMessageOfError)
      )
    )
  );

const config = fp.readerTaskEither.local((libConfig: LibConfig) => libConfig.configLocation)(
  readConfig
);

const usingConfig = fp.readerTaskEither.chain((config: JSON) => (libConfig: LibConfig) =>
  fp.taskEither.fromOption(() => `specify config is not exist in ${libConfig.configLocation}`)(
    fp.option.fromNullable(config[libConfig.usingConfigName] as AppConfig | undefined)
  )
)(config);

export const main = fp.readerTaskEither.readerTaskEither.chain(
  usingConfig,
  (appConfig: AppConfig) =>
    fp.readerTaskEither.fromTaskEither(
      taskEitherMain({
        targetBranch: appConfig.targetBranch,
        projectId: appConfig.projectId,
        workingBranch: appConfig.workingBranch,
        gitlabClient: new GitlabClient({
          token: appConfig.gitlabToken,
          host: appConfig.gitlabHost,
        }),
      })
    )
);
