import * as React from "react";
import {Params} from "../../component/Params";


export class StepContent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.initParams(props.stepData.params);
    }

    initParams(paramsNames) {
        this.params = [];
        paramsNames.forEach(name => {
            this.params.push(this.props.modelParams[name]);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.initParams(nextProps.stepData.params);
    }

    render() {
        return (
            <Params ref="paramsComponent" parapets={this.params}/>
        );
    }
}
