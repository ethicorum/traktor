import React, { Component } from "react";
import { withFauxDOM } from "react-faux-dom";
import { IRawData } from "./Data";

export const CommonProps = {
    width: 640,
    height: 480,
    margins: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },
    id: null,
    data: [],
    duration: 0,
    title: ""
};

export interface IChart {
    width: number;
    height: number;
    margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    id?: string;
    svgClassName?: string;
    data: IRawData[];
}

class Chart extends Component<IChart> {
    static defaultProps = {
        ...CommonProps
    };

    render() {
        const {
            height,
            width,
            margins,
            svgClassName,
            id,
            children
        } = this.props;

        var t = `translate(${margins.left}, ${margins.top})`;

        // var children = React.Children.map(this.props.children, (el) => {
        //     return React.cloneElement(el, {...this.props})
        // })

        return (
            <svg
                height={height + margins.top + margins.bottom}
                width={width + margins.left + margins.right}
                className={svgClassName}
                id={id}
                ref="svgContainer"
            >
                <g transform={t}>{children}</g>
            </svg>
        );
    }
}

export default withFauxDOM(Chart);
