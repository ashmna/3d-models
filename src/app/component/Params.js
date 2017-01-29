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


    changeValue(value, i) {
        this.params[i].value = value;
        console.log(this.params[i].value);
        this.setState({random: Math.random()});
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
                        style={{width: "100%"}}
                        value={param.value}
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
                        style={{width: "100%"}}
                        value={param.value}
                        onChange={(e, value) => this.changeValue(value, i)}
                    />
                </Col>
            </Row>
        );
    }
}
