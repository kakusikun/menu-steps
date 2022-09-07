import { useContext } from "react";
import AppCtx from "../AppContext";
import StyledResponse from "./styles/StyledResponse.style";

function ResponseArea() {
    const [appState, handleAppState] = useContext(AppCtx);
    return <StyledResponse>
        {appState.response}
    </StyledResponse>
}

export default ResponseArea;