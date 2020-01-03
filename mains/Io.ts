import {getMain} from "../getMain";
import {gitIo, gitlabIo, programIo} from "../instances/Io";
import {APP_CONFIG} from "../secret";

const main = getMain({...programIo, ...gitIo, ...gitlabIo});

main(APP_CONFIG)()