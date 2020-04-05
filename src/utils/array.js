import findIndex from "lodash/findIndex"

export const findAndReplace = (arr, criteria, replaceWith) => {
    const index = findIndex(arr, criteria);

    if (-1 === index) {
        return;
    }

    arr.splice(index, 1, replaceWith);
};
