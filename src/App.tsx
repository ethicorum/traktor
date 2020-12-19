import * as React from "react";
import "./styles.css";
import Tree from "./Tree";
import Population from "./Chart/Population";
import { initialState } from "./Chart/Data";

export default function App() {
    return (
        <div className="App">
            <h1>
                Православно используем D3, React, TypeScript, BEM, scss, mobx!
            </h1>
            <Population data={initialState.data} />
            <Tree />
        </div>
    );
}
