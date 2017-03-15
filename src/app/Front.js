import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {BG} from "./front-component/BG";
import * as colors from 'material-ui/styles/colors';


const style = {
    card: {
        width: "350px",
        minHeight: "50px",
    },
    full: {
        top: "3%",
        width: "96%",
        minHeight: "94%",
        // maxWidth: "",
        WebkitTransform: "translate(-50%, 0)",
        transform: "translate(-50%, -0)",
        background: colors.white,
    }
};

export class Front extends React.Component {

    constructor(props, context) {
        super(props, context);

        CONFIG.setThemByName = this.setThemByName.bind(this);

        this.state = {
            viewMode: props.params["modelCode"] ? "full" : "card",
            primary1Color: colors['red500'],
            primary2Color: colors['red700'],
            accent1Color: colors['redA200'],
            pickerHeaderColor: colors['red500'],
        };

        // setInterval(() => {
        //     this.setState({
        //         viewMode: this.state.viewMode === "card" ? "full" : "card"
        //     });
        // }, 5000);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            viewMode: nextProps.params["modelCode"] ? "full" : "card",
        });
    }

    setThemByName(name) {
        this.setState({
            primary1Color: colors[name + '500'],
            primary2Color: colors[name + '700'],
            accent1Color: colors[name + 'A200'],
            pickerHeaderColor: colors[name + '500'],
        });
    }

    getThem() {
        const them = lightBaseTheme;

        them.palette.primary1Color = this.state.primary1Color;
        them.palette.primary2Color = this.state.primary2Color;
        them.palette.accent1Color = this.state.accent1Color;
        them.palette.pickerHeaderColor = this.state.pickerHeaderColor;

        return them;
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(this.getThem())}>
                <div>
                    <div className="main-card" style={style[this.state.viewMode]}>
                        {this.props.children}
                    </div>
                    <BG ref="bg"/>
                </div>
            </MuiThemeProvider>
        );
    }
}
