import {getMain} from '../getMain';
import {gitlabTaskEitherString, gitTaskEitherString, programTaskEitherString,} from '../instances/TaskEitherString';
import {APP_CONFIG} from '../helpers';

export const taskEitherMain = getMain({
    ...programTaskEitherString,
    ...gitTaskEitherString,
    ...gitlabTaskEitherString,
});

// taskEitherMain(APP_CONFIG)().then(console.log, console.log);
