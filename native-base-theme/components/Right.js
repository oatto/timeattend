import variable from './../variables/platform';

export default (variables = variable) => {
    const rightTheme = {
        'NativeBase.Button': {
            alignSelf: null,
        },
        ".sidebar": {
            flex: 0,
            paddingHorizontal: variables.sp3,
        },
        ".listItem": {
            flex: 0,
            paddingHorizontal: variables.sp2,
        },
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
    };

    return rightTheme;
};
