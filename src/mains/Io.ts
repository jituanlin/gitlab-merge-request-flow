import {getMain} from '../getMain';
import {gitIo, gitlabIo, programIo} from '../instances/Io';

const main = getMain({...programIo, ...gitIo, ...gitlabIo});

