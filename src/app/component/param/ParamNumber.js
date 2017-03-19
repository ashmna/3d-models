import React from "react";
import {Row, Col} from "react-bootstrap";
import Slider from "material-ui/Slider";
import TextField from "material-ui/TextField";
import * as colors from "material-ui/styles/colors";


export class ParamNumber extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.param;
        this.state = {
            sliderValue: this.data.value,
            textValue: this.data.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.data = nextProps.param;
        this.setState({
            sliderValue: this.data.value,
            textValue: this.data.value,
        });
    }

    changeValue(value) {
        value = parseFloat(value);
        if (value < this.data.min) {
            value = this.data.min;
        }
        if (value > this.data.max) {
            value = this.data.max;
        }
        if (isNaN(value)) {
            value = this.data.value;
        }

        return this.data.value = value;
    }

    sliderChangeHandler(event, value) {
        value = this.changeValue(value);
        this.setState({
            textValue: value,
            sliderValue: value,
        });
    }

    textFieldChangeHandler(event, value) {
        value = this.changeValue(value);
        this.setState({
            sliderValue: value,
            textValue: event.target.value,
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <label style={{color: colors.grey400}}>{this.data.label}</label>
                </Col>
                <Col xs={10}>
                    <Slider ref="slider"
                            value={this.state.sliderValue}
                            min={this.data.min}
                            max={this.data.max}
                            step={this.data.step}
                            onChange={this.sliderChangeHandler.bind(this)}
                    />
                </Col>
                <Col xs={2}>
                    <TextField ref="text"
                               value={this.state.textValue}
                               id={this.data.name}
                               name={this.data.name}
                               style={{width: "100%"}}
                               onChange={this.textFieldChangeHandler.bind(this)}
                    />
                </Col>
            </Row>
        );
    }
}
