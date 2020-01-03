import { mainTaskEitherString } from '../instances/TaskEitherString';
import { APP_CONFIG } from '../secret';

const main = mainTaskEitherString(APP_CONFIG);
main().then(console.log, console.log);
