import * as React from "react";

const style = {
    container: {
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        top: "0",
    },
    first: {
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        top: "0",
        background: 'linear-gradient(15deg, #d33f34 50%, #a61322 50.1%)',
        transition: 'all .8s linear',
    },
    second: {
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        top: "0",
        background: 'linear-gradient(15deg, #d33f34 50%, #a61322 50.1%)',
        transition: 'all .8s linear',
    }
};

export class BG extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            view: "first",
            color1: props.color1 || "#d33f34",
            color2: props.color2 || "#a61322",
        };
        style.first.background = `linear-gradient(15deg, ${this.state.color1} 50%, ${this.state.color2} 50.1%)`;
        style.second.background = `linear-gradient(15deg, ${this.state.color1} 50%, ${this.state.color2} 50.1%)`;

        this.key = this.state.color1 + '-' + this.state.color2;
        CONFIG.changeBgColor = this.changeBgColor.bind(this);
        // setInterval(() => {
        //     this.setState({
        //         viewMode: this.state.viewMode === "card" ? "full" : "card"
        //     });
        // }, 5000);
    }

    componentWillReceiveProps(nextProps) {
        this.changeBgColor(nextProps.color1, nextProps.color2);
    }

    changeBgColor(color1, color2) {
        const key = color1 + '-' + color2;
        if (this.key !== key) {
            this.key = key;
            this.setState({
                view: this.state.view === "first" ? "second" : "first",
                color1: color1 ,
                color2: color2 ,
            });
        }
    }

    //0.6180339887498948482
    //0.61C886468
    genColors(mainColor) {
        let g = 0.381966011;

        let red = (mainColor >> 16) & 0xFF;
        let green = (mainColor >> 8) & 0xFF;
        let blue = mainColor & 0xFF;

        let redDelta = (red * g) / 6;
        let greenDelta = (green * g) / 6;
        let blueDelta = (blue * g) / 6;

        let red1 = red + redDelta;
        let green1 = green + greenDelta;
        let blue1 = blue + blueDelta;

        let red2 = red - redDelta;
        let green2 = green - greenDelta;
        let blue2 = blue - blueDelta;

        let color1 = red1 << 16 | green1 << 8 | blue1;
        let color2 = red2 << 16 | green2 << 8 | blue2;
        let pad = "000000";

        return [
            (pad + color1.toString(16)).slice(-pad.length),
            (pad + color2.toString(16)).slice(-pad.length),
        ];
    }

    render() {
        // let [c1, c2] = this.genColors(0xa61322);
        if (this.state.view === "first") {
            style.first.opacity = 1;
            style.second.opacity = 0;
        } else {
            style.first.opacity = 0;
            style.second.opacity = 1;
        }

        style[this.state.view].background = `linear-gradient(15deg, ${this.state.color1} 50%, ${this.state.color2} 50.1%)`;
        // style.second.background =  `linear-gradient(15deg, #${c1} 50%, #${c2} 50.1%)`;

        return (
            <div ref="bg-container" style={style.container}>
                <div ref="bg-first" style={style.first}></div>
                <div ref="bg-second" style={style.second}></div>
            </div>
        );
    }
}
