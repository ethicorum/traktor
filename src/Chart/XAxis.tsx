import { Component, ReactNode } from "react";
import * as d3 from "d3";
import { ReactFauxDomProps, withFauxDOM } from "react-faux-dom";
import { IRawData } from "./Data";
import { CommonProps } from "./Chart";

interface IXAxis extends ReactFauxDomProps {
    width: number;
    height: number;
    data: IRawData[];
    margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    duration: number;
    xDomain: (k: IRawData) => string;
    chart: ReactNode;
}

class XAxis extends Component<IXAxis> {
    static defaultProps = {
        ...CommonProps
    };

    componentDidMount() {
        this.renderD3();
    }

    componentDidUpdate(prevProps: Readonly<IXAxis>, prevState: Readonly<{}>) {
        // do not compare props.chart as it gets updated in updateD3()
        if (this.props.data !== prevProps.data) {
            this.updateD3();
        }
    }

    getXScale(
        width: number,
        domain: (d: IRawData) => string,
        data: IRawData[]
    ) {
        let xScale = d3.scaleBand().rangeRound([0, width]).padding(0.3);
        xScale.domain(data.map(domain));
        return xScale;
    }

    getXAxis(xScale: d3.ScaleBand<string>): d3.Axis<string> {
        return d3.axisBottom(xScale);
    }

    renderD3() {
        const { height, width, data, xDomain, connectFauxDOM } = this.props;

        let g = connectFauxDOM("g", "chart");
        let xScale = this.getXScale(width, xDomain, data);
        let axisDom = d3.select(g);
        let xAxis = this.getXAxis(xScale);

        axisDom
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    }

    updateD3() {
        const {
            width,
            data,
            duration,
            xDomain,
            connectFauxDOM,
            animateFauxDOM
        } = this.props;

        let g = connectFauxDOM("g", "chart");
        let xScale = this.getXScale(width, xDomain, data);
        let axisDom = d3.select(g);
        let xAxis = this.getXAxis(xScale);

        axisDom.transition().duration(duration).call(xAxis);

        animateFauxDOM(duration);
    }

    render() {
        if (this.props.chart) {
            return this.props.chart;
        } else {
            return null;
        }
    }
}

export default withFauxDOM(XAxis);
