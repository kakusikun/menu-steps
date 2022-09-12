import { useContext, useEffect, useRef } from "react";
import AppCtx from "../AppContext";
import StyledResponse from "./styles/StyledResponse.style";

function ResponseArea() {
    const textElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    useEffect(() => {
        textElement.current.value = appState.response;
    }, [appState.response])

    return <StyledResponse>
        <textarea ref={textElement}>
        </textarea>
    </StyledResponse>
}

export default ResponseArea;