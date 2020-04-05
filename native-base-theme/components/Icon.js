import variable from "./../variables/platform";

export default (variables = variable) => {
    const iconTheme = {
        fontSize: variables.iconFontSize,
        color: variables.black,
        ".headerMenuIcon": {
            marginHorizontal: variables.sp1,
            color: variables.white,
            fontSize: variables.fs3 - 5,
        }
    };

    return iconTheme;
};
