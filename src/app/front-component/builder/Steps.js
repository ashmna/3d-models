import * as React from "react";
import {Row, Col} from "react-bootstrap";
import {Step, Stepper, StepLabel} from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {StepContent} from "./StepContent";
import {BayStepContent} from "./BayStepContent";
import {Viewer3D} from "../../component/Viewer3D";
import {ModelService} from "../../service/ModelService";

export class Steps extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.modelService = new ModelService();
        this.state = {
            finished: false,
            stepIndex: 0,
        };
        this.modelParams = null;
        this.steps = [];
        this.initModelParams();
    }

    initModelParams() {
        this.modelParams = {};
        this.props.modelParams.forEach(param => {
            this.modelParams[param.name] = param;
        });
        this.steps = this.props.steps;
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.initModelParams();
        this.setState({
            finished: false,
            stepIndex: 0,
        });
    }


    handleNext() {
        const {finished, stepIndex} = this.state;
        if (finished) {
            return;
        }
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= this.steps.length,
        });
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({
                stepIndex: stepIndex - 1,
                finished: false,
            });
        }
    }

    regenerateModel() {
        const res = {};
        props.modelParams.forEach(param => res[param.name] = param.value);
        this.modelService
            .generateModel(this.props.params["modelCode"], res)
            .then(data => {
                this.refs.viewer.loadStl('http://localhost:3003/' + data.file);
                console.log('generateModel - data', data);
            });
    }

    getStepContent(stepIndex) {
        if (stepIndex !== this.steps.length) {
            return (<StepContent ref="stepContent" modelParams={this.modelParams} stepData={this.steps[stepIndex]}/>);
        }
        return (<BayStepContent ref="bayStepContent"/>);
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
                    <Step>
                        <StepLabel>Complete</StepLabel>
                    </Step>
                </Stepper>
                <Row>
                    <Col md={6}>
                        {this.getStepContent(stepIndex)}
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
