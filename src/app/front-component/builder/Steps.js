import * as React from "react";
import {Row, Col} from "react-bootstrap";
import {
    Step,
    Stepper,
    StepLabel,
} from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {StepContent} from "./StepContent";
import {Viewer3D} from "../../component/Viewer3D";

export class Steps extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            finished: false,
            stepIndex: 0,
        };
        this.modelParams = {};
        props.modelParams.forEach(param => {
            this.modelParams[param.name] = param;
        });
        this.steps = props.steps;
    }


    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= this.steps.length,
        });
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div>
                <Stepper activeStep={stepIndex}>
                    {this.steps.map((step, i) => {
                        return (
                            <Step key={i}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <Row>
                    <Col md={6}>
                        <StepContent ref="stepContent" modelParams={this.modelParams} stepData={this.steps[stepIndex]}/>
                        <div style={{marginTop: 12}}>
                            <FlatButton
                                label="Back"
                                disabled={stepIndex === 0}
                                onTouchTap={this.handlePrev.bind(this)}
                                style={{marginRight: 12}}
                            />
                            <RaisedButton
                                label={stepIndex === this.steps.length ? "Finish" : "Next"}
                                primary={true}
                                onTouchTap={this.handleNext.bind(this)}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <Viewer3D ref="viewer"/>
                    </Col>
                </Row>
            </div>
        );
    }
}
