import variable from './../variables/platform';

export default (variables = variable) => {
    const bodyTheme = {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        ".sidebar": {
            alignItems: 'flex-start',
        }
    };

    return bodyTheme;
};
