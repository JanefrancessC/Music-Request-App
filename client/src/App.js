import React from "react";
import RequestForm from "./components/RequestForm";
import CallRequestForm from "./components/CallRequestForm";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Music Request App</h1>
      <RequestForm />
      <CallRequestForm />
    </div>
  );
}

export default App;
