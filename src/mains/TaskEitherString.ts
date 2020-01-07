import {getMain} from '../getMain';
import {gitlabTaskEitherString, gitTaskEitherString, programTaskEitherString,} from '../instances/TaskEitherString';
import {GITLAB_CONFIG} from '../helpers';

export const taskEitherMain = getMain({
    ...programTaskEitherString,
    ...gitTaskEitherString,
    ...gitlabTaskEitherString,
});

// taskEitherMain(GITLAB_CONFIG)().then(console.log, console.log);
