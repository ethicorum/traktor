import React, { Component } from "react";
import { withFauxDOM } from "react-faux-dom";
import Chart from "./Chart";
import { IRawData } from "./Data";
import XAxis from "./XAxis";
// import XAxis from "./Xaxis";

class Population extends Component<{
    data: IRawData[];
}> {
    render() {
        const { data } = this.props;

        // set margins
        var margins = {
            top: 20,
            right: 40,
            bottom: 65,
            left: 65
        };

        // calculate visualization width and height
        const width = 900 - margins.left - margins.right;
        const height = 425 - margins.top - margins.bottom;

        // transition durations
        var duration = 500;

        // domains
        // const yDomain = (d) => d.population;

        return (
            <div>
                <div>qwer</div>
                <Chart
                    data={data}
                    width={width}
                    height={height}
                    margins={margins}
                >
                    <XAxis
                        data={data}
                        width={width}
                        height={height}
                        margins={margins}
                        duration={duration}
                        xDomain={(d) => d.key}
                    />
                </Chart>
                <div>qwer2</div>
            </div>
        );
    }
}

export default withFauxDOM(Population);
