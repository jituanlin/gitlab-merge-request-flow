import {getMain} from '../getMain';
import {gitIo, gitlabIo, programIo} from '../instances/Io';
import {GITLAB_CONFIG} from "../helpers";

const main = getMain({...programIo, ...gitIo, ...gitlabIo});


main(GITLAB_CONFIG)();
