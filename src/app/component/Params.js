import React from "react";
import {ParamNumber} from "./param/ParamNumber";
import {ParamString} from "./param/ParamString";

export class Params extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.params = props.params;
    }

    getParams() {
        let params = {};
        this.params.forEach(param => {
            params[param.name] = param.value;
        });
        return params;
    }

    render() {
        const params = this.params.map((param, i) => {
            if (param.type === "Number") {
                return (<ParamNumber key={i} param={param}/>);
            } else if (param.type === "String") {
                return (<ParamString key={i} param={param}/>);
            }
        });
        return (
            <div>
                {params}
            </div>
        );
    }
}
