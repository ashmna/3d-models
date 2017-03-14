import React from "react";
import {ParamNumber} from "./param/ParamNumber";
import {ParamString} from "./param/ParamString";
import {ParamSelect} from "./param/ParamSelect";

export class Params extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            parapets: props.parapets,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            parapets: nextProps.parapets,
        });
    }

    getParams() {
        // let params = {};
        // this.params.forEach(param => {
        //     params[param.name] = param.value;
        // });
        // return params;
    }

    render() {
        const params = this.state.parapets.map((param, i) => {
            if (param.type === "Number") {
                return (<ParamNumber key={i} param={param}/>);
            } else if (param.type === "String") {
                return (<ParamString key={i} param={param}/>);
            } else if (param.type === "Select") {
                return (<ParamSelect key={i} param={param}/>);
            }
        });
        return (
            <div>
                {params}
            </div>
        );
    }
}
