import ref from "react-native-core/utils/ref"
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import { GET_MY_EMPLOYEES_STATE_KEY, GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY } from "./constants"

export const myEmployees = (state) => {
    return state.mngDashboard[GET_MY_EMPLOYEES_STATE_KEY];
};

export const getCheckedAndUnCheckedMyEmployee = (state) => {
    const dataCount = {
        'all': [],
        'checked': [],
        'unchecked': []
    };

    myEmployees(state).data.map((employee) => {
        dataCount.all.push(employee);
        if (ref(employee, 'check_time_data_with_date.check_in')) {
            dataCount.checked.push(employee);

            return;
        }

        dataCount.unchecked.push(employee);
    });

    return dataCount;
};

export const getMyEmployeesCheckTimeTransactionsOutsideHistory = (state) => state.mngDashboard[GET_MY_EMPLOYEE_CHECK_TIME_OUTSIDE_STATE_KEY];
export const getMyEmployeesCheckTimeTransactionsOutsideHistoryWithGroup = (state) => {
    let grouped = {};
    getMyEmployeesCheckTimeTransactionsOutsideHistory(state).data.map((data) => {
        const employeeId = data.employee.employee_id;

        if (!grouped[employeeId]) {
            grouped[employeeId] = [];
        }
        grouped[employeeId].push(data);
    });

    let groupArr = [];
    forEach(grouped, (data, employeeId) => {
        groupArr.push({
            data, employeeId
        })
    });

    return sortBy(groupArr, ['employeeId']).reverse();
};
