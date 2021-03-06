import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {DashboardAppBar} from "./component/dashboard/DashboardAppBar";
import {DashboardMenu} from "./component/dashboard/DashboardMenu";
import {DashboardFooter} from "./component/dashboard/DashboardFooter";

const style = {
    container: {
        margin: "48px 72px",
    }
};


export class Dashboard extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };

        this.menu = null;
        this.appBar = null;
        this.footer = null;
    }

    openMenu() {
        this.menu.openMenu();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <DashboardMenu ref={menu => this.menu = menu}/>
                    <DashboardAppBar ref={appBar => this.appBar = appBar} onOpenMenu={() => this.openMenu()}/>
                    <div style={style.container}>
                        {this.props.children}
                    </div>
                    <DashboardFooter ref={footer => this.footer = footer}/>
                </div>
            </MuiThemeProvider>
        );
    }
}
