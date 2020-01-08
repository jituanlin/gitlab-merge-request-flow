import * as fp from 'fp-ts';
import {AppConfig, GitConfig, GitlabConfig, MrId, WorkingBranch} from './types';

export interface Program<F extends fp.hkt.URIS> extends fp.monad.Monad1<F> {
  finish: <A>(a: A) => fp.hkt.Kind<F, A>;
}

export interface Git<F extends fp.hkt.URIS> {
  rebase: fp.readerT.ReaderT1<F, GitConfig, void>;
  push: fp.readerT.ReaderT1<F, GitConfig, void>;
}

export interface Gitlab<F extends fp.hkt.URIS> {
  createMr: fp.readerT.ReaderT1<F, GitlabConfig, MrId>;
  mergeMr: (mrId: MrId) => fp.readerT.ReaderT1<F, GitlabConfig, void>;
}

export interface Main<F extends fp.hkt.URIS> extends Program<F>, Git<F>, Gitlab<F> {}
