import Layout from "./components/Layout";
import AppCtx from "./AppContext";
import { useState } from "react";

function App() {

  const initialAppState = {
    server: "",
    menuSelection: [],
    response: "123",
  }
  const [appState, setAppState] = useState(initialAppState)

  const handleAppState = (state) => {
    setAppState({...appState, ...state})
  }

  return (
    <AppCtx.Provider value={[appState, handleAppState]}>
      <Layout />
    </AppCtx.Provider>
  );
}

export default App;
