import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import Loading from "./components/Loading";

const App = () => {
  return (
    <div className="App">
      <Loading />
      <Weather />
    </div>
  );
};

export default App;
