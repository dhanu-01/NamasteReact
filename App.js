import React from "react";
import ReactDOM from "react-dom/client";

// React.CreateElement => Object => HTMLELEment(render)

const elem = <span>React Element</span>

//React Element
const heading = React.createElement("h1", { id: "heading" }, "Namaste React ");

//JSX => Babel transpiles it to React.createElement => ReactElement-JS object => HTMLElement(render)
const jsxHeading = <h1 id="heading">Namaste React using JSX </h1>;

// React Component
// Class Based Component - OLD
// Functional Component - NEW
// const HeadingComponent = () => {
//     return <h1>Namaste React Functional Component</h1>;
// }
const Title = () => (
    <h1 className="head">
        {elem}
        Namaste React using JSX
    </h1>
)

//Component Composition
const HeadingComponent2 = () => (
    <div id='container'>
        <Title/>
        {Title()}
        <h1 className="heading"> Namaste react Functional Component</h1>
    </div>

)

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(jsxHeading);
root.render(<HeadingComponent2 />)
