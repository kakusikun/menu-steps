import Layout from "./components/Layout";
import AppCtx from "./AppContext";
import { useReducer, useState } from "react";
import TserverLayout from "./components/TserverLayout";

function App() {

  const initialAppState = {
    server: "",
    menuSelection: [],
    menuValue: [],
    response: "",
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
      {/* <Layout /> */}
      <TserverLayout />
    </AppCtx.Provider>
  );
}

export default App;
