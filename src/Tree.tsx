import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import * as d3 from "d3";
import { withFauxDOM, ReactFauxDomProps } from "react-faux-dom";

interface ITestD3 extends ReactFauxDomProps {
    width: number;
    height: number;
    animDuration: number;
    data: number[];
    chart: string;
}

class TestD3 extends Component<ITestD3> {
    static defaultProps = {
        data: [1, 2, 3, 4, 5],
        chart: "loading",
        animDuration: 600
    };

    componentDidMount() {
        const {
            data,
            animDuration,
            width,
            height,
            connectFauxDOM,
            animateFauxDOM
        } = this.props;

        const faux = connectFauxDOM("g", "chart");

        const bars = d3
            .select(faux)
            .selectAll(".bar")
            .data(data, function key(d) {
                // return d.item;
                return "asdf" + JSON.stringify(d);
            });
        bars.exit()
            .transition()
            .duration(animDuration)
            .attr("y", height)
            .attr("height", 0)
            .style("fill-opacity", 0)
            .remove();

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", height)
            .attr("x", width)
            .attr("width", 0)
            .attr("height", 0)
            .attr("rx", 5)
            .attr("ry", 5)
            // .merge(bars)
            .transition()
            .duration(animDuration)
            // .attr("y", (d) => this.scaleHeight(d.count))
            // .attr("height", (d) => height - this.scaleHeight(d.count))
            // .attr("x", (d: string, i) => this.scaleWidth(d.item))
            // .attr("width", this.scaleWidth.bandwidth())
            .style("fill", (d, i) => "#ffffff");

        animateFauxDOM(800);
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg width={width} height={height}>
                {this.props.chart}
            </svg>
        );
    }
}

const TestD3Extended = withFauxDOM(TestD3);

// interface IBarChartV4 extends ReactFauxDomProps {
//     data: number[];
//     width: number;
//     height: number;
//     animDuration: number;
// }

// class BarChartV4 extends Component<IBarChartV4> {
//     static defaultProps = {
//         animDuration: 600
//     };

//     scaleColor = d3.scaleSequential(d3.interpolateViridis);
//     scaleHeight = d3.scaleLinear();
//     scaleWidth = d3.scaleBand().padding(0.1);

//     componentDidMount() {
//         this.updateChart();
//     }

//     componentDidUpdate(
//         prevProps: Readonly<IBarChartV4>,
//         prevState: Readonly<{}>
//     ) {
//         if (this.props.data !== prevProps.data) {
//             this.updateChart();
//         }
//     }

//     updateChart() {
//         this.updateScales();

//         const { data, width, height, animDuration } = this.props;
//         const faux = this.props.connectFauxDOM("g", "chart");
//         const bars = d3
//             .select(faux)
//             .selectAll(".bar")
//             .data(data, function key(d) {
//                 return d.item;
//             });
//         bars.exit()
//             .transition()
//             .duration(animDuration)
//             .attr("y", height)
//             .attr("height", 0)
//             .style("fill-opacity", 0)
//             .remove();

//         bars.enter()
//             .append("rect")
//             .attr("class", "bar")
//             .attr("y", height)
//             .attr("x", width)
//             .attr("width", 0)
//             .attr("height", 0)
//             .attr("rx", 5)
//             .attr("ry", 5)
//             .merge(bars)
//             .transition()
//             .duration(animDuration)
//             .attr("y", (d) => this.scaleHeight(d.count))
//             .attr("height", (d) => height - this.scaleHeight(d.count))
//             .attr("x", (d: string, i) => this.scaleWidth(d.item))
//             .attr("width", this.scaleWidth.bandwidth())
//             .style("fill", (d, i) => this.scaleColor(i));

//         this.props.animateFauxDOM(800);
//     }

//     updateScales() {
//         const { data, width, height } = this.props;
//         this.scaleColor.domain([0, data.length]);
//         this.scaleWidth.domain(data.map((d) => d.item)).range([0, width]);
//         this.scaleHeight
//             .domain(d3.extent(data, (d) => d.count))
//             .range([height - 20, 0]);
//     }

//     render() {
//         const { width, height } = this.props;
//         return (
//             <svg width={width} height={height}>
//                 {this.props.chart}
//             </svg>
//         );
//     }
// }

// export const BarChart = withFauxDOM(BarChartV4);

class Store {
    @observable name: string = "Стёпа";
}

@observer
export default class Tree extends Component {
    private store = new Store();

    render() {
        return (
            <div>
                <div>asdf</div>
                <TestD3Extended
                    data={[1, 2, 3, 4]}
                    width={800}
                    height={600}
                    animDuration={600}
                    chart="loading"
                />
            </div>
        );
    }
}
