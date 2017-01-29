import React from "react";
import AppBar from "material-ui/AppBar";


const STATE_DEFAULT_VALUE = {};

export class DashboardAppBar extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = STATE_DEFAULT_VALUE;
    }

    openMenu() {
        this.props.onOpenMenu();
    }

    render() {
        return (
            <AppBar
                title="Dashboard"
                onLeftIconButtonTouchTap={() => this.openMenu()}
            />
        );
    }
}
