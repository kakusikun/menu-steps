import Layout from "./components/Layout";
import AppCtx from "./AppContext";
import { useReducer, useState } from "react";

function App() {

  const initialAppState = {
    server: "",
    menuSelection: [],
    menuValue: [],
    response: "none",
  }

  const reducer = (state, action) => {
    if (action.response !== undefined) {
      return { ...state, ...action, ...{ response: action.response } }
    }
    return { ...state, ...action }
  }

  const [appState, dispatchAppState] = useReducer(reducer, initialAppState)

  const handleAppState = (state) => {
    dispatchAppState(state);
  }

  return (
    <AppCtx.Provider value={[appState, handleAppState]}>
      <Layout />
    </AppCtx.Provider>
  );
}

export default App;
