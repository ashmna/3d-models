import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {BG} from "./front-component/BG";

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
        background: "#FFF",
    }
};

export class Front extends React.Component {

    constructor(props, context) {
        super(props, context);

        console.log(props);

        this.state = {
            viewMode: props.params["modelCode"] ? "full" : "card",
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

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
