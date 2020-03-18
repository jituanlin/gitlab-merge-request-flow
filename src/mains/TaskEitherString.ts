import {getMain} from '../getMain';
import {gitlabTaskEitherString, gitTaskEitherString, programTaskEitherString,} from '../instances/TaskEitherString';

export const taskEitherMain = getMain({
    ...programTaskEitherString,
    ...gitTaskEitherString,
    ...gitlabTaskEitherString,
});
