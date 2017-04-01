import * as React from "react";
import {Row, Col} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import SwipeableViews from "react-swipeable-views";
import {Link} from "react-router";
import {autoPlay} from "react-swipeable-views-utils";
import {ModelService} from "../service/ModelService";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const style = {
    title: {
        position: "absolute",
        top: "-128px",
        left: "-250px",
        right: "-250px",
        textAlign: "center",
    },
    titleH1: {
        color: "#FFFFFF",
        fontSize: "64px",
    },
    models: {
        position: "absolute",
        left: "-250px",
        right: "-250px",
        bottom: "-150px",
        textAlign: "center",
    },
    model: {
        height: 100,
        width: 100,
        margin: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign: "center",
        display: "inline-block",
    },
    activeModel: {
        height: 120,
        width: 120,
        margin: 20,
        marginLeft: 0,
        marginRight: 0,
        textAlign: "center",
        display: "inline-block",
    }
};

export class ChooseModel extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.modelService = new ModelService();
        this.state = {
            showBuilder: false,
            activeModelIndex: 0,
            models: [],
        };
        // const left = Math.floor((window.document.innerHeight - 350) / 2);
        // style.models.left = "-" + left + "px";
        // style.models.right = "-" + left + "px";
        //
        // setInterval(() => {
        //     this.setState({
        //         viewMode: this.state.viewMode === "card" ? "full" : "card"
        //     });
        // }, 5000);
        this.loadModels();
    }

    loadModels() {
        this.modelService.getModelList().then(list => {
            console.log(list);
            this.setState({models: list});
        });
    }

    customize() {
        this.setState({
            showBuilder: true,
        });
    }

    handelChangeIndex(newIndex, oldIndex) {
        this.setState({activeModelIndex: newIndex});
    }

    render() {
        if (!this.state.models.length) {
            return (<div/>);
        }
        if (CONFIG.changeBgColor) {
            CONFIG.changeBgColor(
                this.state.models[this.state.activeModelIndex].color1,
                this.state.models[this.state.activeModelIndex].color2
            );
        }
        return (
            <div>

                <div style={style.title}>
                    <h1 style={style.titleH1}>
                        {this.state.models[this.state.activeModelIndex].title}
                    </h1>
                </div>

                <div>
                    <Row>
                        <Col xs={12}>
                            <AutoPlaySwipeableViews
                                onChangeIndex={this.handelChangeIndex.bind(this)}
                                index={this.state.activeModelIndex}
                                interval={17000}
                            >
                                {this.state.models.map((model, index) => (
                                    <div>
                                        <img src={model.img} className="img-responsive center-block"/>
                                        <br/>
                                        <div className="text-center">
                                            <Link to={"/model/" + model.code}>
                                                <RaisedButton label="Customize"/>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </AutoPlaySwipeableViews>
                        </Col>
                    </Row>
                </div>

                <Row style={style.models}>
                    {this.state.models.map((model, index) => (
                        <Paper
                            key={index}
                            style={index === this.state.activeModelIndex ? style.activeModel : style.model}
                            onTouchTap={() => ((index) => this.setState({activeModelIndex: index}))(index)}
                            zDepth={2}
                        >
                            <img src={model.img} style={{
                                width: 90,
                                height: 90,
                                margin: 10
                            }}/>
                        </Paper>
                    ))}
                </Row>

            </div>
        );
    }
}
