import React from "react";
import Slider from "material-ui/Slider";
import TextField from "material-ui/TextField";
import {Row, Col} from "react-bootstrap";


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

    changeValue(value, i) {
        if (this.params[i].type === "Number") {
            value = parseFloat(value);
            if (value < this.params[i].min) {
                value = this.params[i].min;
            }
            if (value > this.params[i].max) {
                value = this.params[i].max;
            }
            if (isNaN(value)) {
                value = this.params[i].value;
            }
        }
        this.params[i].value = value;

        this.setState({});
    }

    render() {
        const params = this.params.map((param, i) => {
            if (param.type === "Number") {
                return this.renderNumber(param, i);
            } else if (param.type === "String") {
                return this.renderString(param, i);
            }
        });
        return (
            <div>
                {params}
            </div>
        );
    }

    renderNumber(param, i) {
        return (
            <Row key={i}>
                <Col xs={10}>
                    <Slider
                        defaultValue={param.value}
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        onChange={(e, value) => this.changeValue(value, i)}
                    />
                </Col>
                <Col xs={2}>
                    <TextField
                        id={param.name}
                        name={param.name}
                        style={{width: "100%"}}
                        defaultValue={param.value}
                        onChange={(e, value) => this.changeValue(value, i)}
                    />
                </Col>
            </Row>
        );
    }

    renderString(param, i) {
        return (
            <Row key={i}>
                <Col xs={12}>
                    <TextField
                        id={param.name}
                        name={param.name}
                        style={{width: "100%"}}
                        defaultValue={param.value}
                        onChange={(e, value) => this.changeValue(value, i)}
                    />
                </Col>
            </Row>
        );
    }
}
