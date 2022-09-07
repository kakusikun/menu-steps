import { useContext } from "react";
import AppCtx from "../AppContext";
import StyledResponse from "./styles/StyledResponse.style";

function ResponseArea() {
    const [appState, handleAppState] = useContext(AppCtx);
    return <StyledResponse>
        {JSON.stringify(appState.response, undefined, 4)}
    </StyledResponse>
}

export default ResponseArea;