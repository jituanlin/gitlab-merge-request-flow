import * as fp from 'fp-ts';
import {Main} from './ADT';
import {GitlabConfig} from './types';

export const getMain = <F extends fp.hkt.URIS>(
    F: Main<F>
): fp.reader.Reader<GitlabConfig, fp.hkt.Kind<F, void>> => {
  const readerM = fp.readerT.getReaderM(F);
  const afterPush = fp.pipeable.pipe(
      readerM.chain(F.rebase, () => F.push),
      fp.reader.local((appConfig: GitlabConfig) => appConfig.workingBranch)
  );
  const mrId = readerM.chain(afterPush, () => F.createMr);
  const result = readerM.chain(mrId, id => F.mergeMr(id));
  return result;
};
