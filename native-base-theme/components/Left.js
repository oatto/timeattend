import variable from './../variables/platform';

export default (variables = variable) => {
    const leftTheme = {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-start',
        ".lowSpacing": {
            paddingHorizontal: 0
        },
        ".sidebar": {
            flex: 0,
        },
        ".listItem": {
            flex: 0,
            paddingHorizontal: variables.sp2
        }
    };

    return leftTheme;
};
