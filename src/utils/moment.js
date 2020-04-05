import moment from 'moment';
import 'moment/locale/th';
import 'moment/locale/en-ca';
import { DEFAULT_LOCALE } from '../common/constants';

// TODO : from store
moment.locale(DEFAULT_LOCALE);

export default moment;
