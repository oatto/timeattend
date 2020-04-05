import themeVariables from '_theme';

export const HEADER_STYLE = {
    headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: themeVariables.primary,
        shadowRadius: 0,
        shadowColor: 'transparent',
        shadowOffset: {
            height: 0,
        },
        elevation: 0,
        height: 55
    },
    headerTintColor: 'white'
};

export const USER_DB_ID = 999;

export const DEFAULT_LOCALE = 'th';

export const BASE_URL_SERVER = 'https://ta.3pprofessional.com';
export const BASE_URL_DEV = 'http://127.0.0.1:8000';

export const APP_VERSION_TEXT = '1.0.0';
export const APP_VERSION = 10000;

export const IS_MANAGER_APP = false;

export const ONE_SIGNAL_EMPLOYEE = '4c154564-0482-4bc6-b7d2-36aa6cf517df';
export const ONE_SIGNAL_MANAGER = 'ae07c06e-7f93-465a-963c-54026e09a88a';

export const FIREBASE_PROJECT_NUMBER_EMPLOYEE = '626602109289';
export const FIREBASE_PROJECT_NUMBER_MANAGER = '992357439742';

export const API_VERSION = 1;
export const API_EMPLOYEE_PREFIX = 'employee';
export const API_MANAGER_PREFIX = 'employee-manager';
export const API_OWNER_PREFIX = 'owner';

export const API_ENDPOINT = `${BASE_URL_SERVER}/api/v${API_VERSION}`;
export const API_EMPLOYEE_ENDPOINT = `${API_ENDPOINT}/${API_EMPLOYEE_PREFIX}`;
export const API_MANAGER_ENDPOINT = `${API_ENDPOINT}/${API_MANAGER_PREFIX}`;
export const API_OWNER_ENDPOINT = `${API_ENDPOINT}/${API_OWNER_PREFIX}`;

export const API_CLIENT_ID = 'id';
export const API_CLIENT_SECRET = 'secret';

export const ANON_USERNAME = 'anonymous';
export const ANON_PASSWORD = 'anonymous12345';
