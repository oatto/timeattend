import { reset } from 'redux-form';
import { put, take } from 'redux-saga/effects';
import { RESET_MONTHLY_FILTER_FORM, RESET_EMPLOYEE_FILTER_FORM } from '_features/common/redux/constants';

export const watchResetMonthlyFilterForm = function*() {
    while (true) {
        const action = yield take(RESET_MONTHLY_FILTER_FORM);

        yield put(reset(action.payload));
    }
};

export const watchResetEmployeeFilterForm = function*() {
    while (true) {
        const action = yield take(RESET_EMPLOYEE_FILTER_FORM);

        yield put(reset(action.payload));
    }
};
