import * as React from "react";
import "./styles.css";
import Tree from "./Tree";
import Population from "./Population";
import { initialState } from "./Data";

export default function App() {
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <Population data={initialState.data} />
            <Tree />
        </div>
    );
}
