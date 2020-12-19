import React, { Component, ReactNode } from "react";
import * as d3 from "d3";
import { ReactFauxDomProps, withFauxDOM } from "react-faux-dom";

interface ITree extends ReactFauxDomProps {
    chart: ReactNode;
}

class Tree extends Component<ITree> {
    static defaultProps = {
        chart: "loading"
    };

    cchart() {
        const root = d3.tree(data);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3
            .create("svg")
            .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

        const g = svg
            .append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

        const link = g
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr(
                "d",
                d3
                    .linkHorizontal()
                    .x((d) => d.y)
                    .y((d) => d.x)
            );

        const node = g
            .append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", (d) => (d.children ? "#555" : "#999"))
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", (d) => (d.children ? -6 : 6))
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .text((d) => d.data.name)
            .clone(true)
            .lower()
            .attr("stroke", "white");

        return svg.node();
    }

    tree() {
        const width = 800;
        const family = d3.hierarchy({
            name: "root",
            children: [
                { name: "child #1" },
                {
                    name: "child #2",
                    children: [
                        { name: "grandchild #1" },
                        { name: "grandchild #2" },
                        { name: "grandchild #3" }
                    ]
                }
            ]
        });
        const root = d3.hierarchy(family);
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.tree().nodeSize([root.dx, root.dy])(root);
    }

    componentDidMount() {
        const faux = this.props.connectFauxDOM("div", "chart");

        d3.select(faux).append("div").html("Hello World!");
        // TODO
        // this.tree();

        this.props.animateFauxDOM(800);
    }

    render() {
        return (
            <div>
                <h2>Here is some fancy data:</h2>
                <div className="renderedD3">{this.props.chart}</div>
            </div>
        );
    }
}

export default withFauxDOM(Tree);
