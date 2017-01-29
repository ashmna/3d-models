import React from "react";

const STATE_DEFAULT_VALUE = {
    open: false,
};

export class DashboardFooter extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = STATE_DEFAULT_VALUE;
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
