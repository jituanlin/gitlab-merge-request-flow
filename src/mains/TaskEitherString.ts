import {getMain} from '../getMain';
import {gitlabTaskEitherString, gitTaskEitherString, programTaskEitherString,} from '../instances/TaskEitherString';
import {GITLAB_CONFIG} from '../helpers';

export const main = getMain({
    ...programTaskEitherString,
    ...gitTaskEitherString,
    ...gitlabTaskEitherString,
});

main(GITLAB_CONFIG)().then(console.log, console.log);
