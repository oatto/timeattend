import variable from "./../variables/platform";

export default (variables = variable) => {
    const platformStyle = variables.platformStyle;

    const tabContainerTheme = {
        elevation: 0,
        flexDirection: "row",
        shadowColor: platformStyle === "material" ? "#000" : undefined,
        shadowOffset: platformStyle === "material"
            ? {width: 0, height: 2}
            : undefined,
        shadowOpacity: platformStyle === "material" ? 0.2 : undefined,
        shadowRadius: platformStyle === "material" ? 1.2 : undefined,
        justifyContent: "space-around",
        borderBottomWidth: 0,
        borderColor: variables.topTabBarBorderColor
    };

    return tabContainerTheme;
};
