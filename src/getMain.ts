import * as fp from 'fp-ts';
import { Main } from './ADT';
import { AppConfig } from './types';

export const getMain = <F extends fp.hkt.URIS>(
  F: Main<F>
): fp.reader.Reader<AppConfig, fp.hkt.Kind<F, void>> => {
  const readerM = fp.readerT.getReaderM(F);
  const afterPush = fp.pipeable.pipe(
    readerM.chain(F.rebase, () => F.push),
    fp.reader.local((appConfig: AppConfig) => ({
      workingBranch: appConfig.workingBranch,
      gitClient: appConfig.gitClient,
    }))
  );
  const mrId = readerM.chain(afterPush, () => F.createMr);
  const result = readerM.chain(mrId, id => F.mergeMr(id));
  return result;
};
