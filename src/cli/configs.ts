import * as os from 'os';

const homeDir = os.homedir();

export const DEFAULT_CONFIG_FILE_LOCATION = `${homeDir}/.config/glmr/config.json`;
