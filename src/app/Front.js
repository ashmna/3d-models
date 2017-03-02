import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const style = {
    main: {
        width: "350px",
    }
};

export class Front extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="main-card" style={style.main}>

                </div>
            </MuiThemeProvider>
        );
    }
}
