import * as fp from 'fp-ts';
import { promises as fsPromises } from 'fs';
import { Gitlab as GitlabClient } from 'gitlab';
import { getMessageOfError } from '../helpers';
import { taskEitherMain } from '../mains/TaskEitherString';
import { DEFAULT_CONFIG_FILE_LOCATION } from './configs';
import { LibConfig, StaticAppConfig } from './types';
import simplegit = require('simple-git/promise');

const readConfig: fp.readerTaskEither.ReaderTaskEither<string, string, JSON> = (
  configLocation: string = DEFAULT_CONFIG_FILE_LOCATION
) =>
  fp.pipeable.pipe(
    fp.taskEither.tryCatch(() => fsPromises.readFile(configLocation), getMessageOfError('read config')),
    fp.taskEither.chain((bf: Buffer) =>
      fp.taskEither.fromIOEither(
        fp.ioEither.tryCatch(() => JSON.parse(bf.toString()), getMessageOfError('parse config'))
      )
    )
  );

const config = fp.readerTaskEither.local((libConfig: LibConfig) => libConfig.configLocation)(
  readConfig
);

const usingConfig = fp.readerTaskEither.chain((config: JSON) => (libConfig: LibConfig) =>
  fp.taskEither.fromOption(() => `specify config is not exist in ${libConfig.configLocation}`)(
    fp.option.fromNullable(config[libConfig.usingConfigName] as StaticAppConfig | undefined)
  )
)(config);

export const main = fp.readerTaskEither.readerTaskEither.chain(
  usingConfig,
  (staticAppConfig: StaticAppConfig) =>
    fp.readerTaskEither.fromTaskEither(
      taskEitherMain({
        targetBranch: staticAppConfig.targetBranch,
        projectId: staticAppConfig.projectId,
        workingBranch: staticAppConfig.workingBranch,
        gitlabClient: new GitlabClient({
          token: staticAppConfig.gitlabToken,
          host: staticAppConfig.gitlabHost,
        }),
        gitClient: simplegit(staticAppConfig.workingDir),
      })
    )
);
