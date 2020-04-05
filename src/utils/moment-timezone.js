import momentTimezone from 'moment-timezone';
import 'moment-timezone/node_modules/moment/locale/th';
import 'moment-timezone/node_modules/moment/locale/en-ca';
import { DEFAULT_LOCALE } from '../common/constants';

// TODO : from store
momentTimezone.locale(DEFAULT_LOCALE);
momentTimezone.tz.setDefault("Asia/Bangkok");

export default momentTimezone;
