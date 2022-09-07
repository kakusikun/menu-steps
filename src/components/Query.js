import { useContext, useEffect, useRef, useState } from "react";
import AppCtx from "../AppContext";
import StyledQuery from "./styles/StyledQuery.style";

function Query({ level, depLevel, depValue, queryTitle }) {
    const [value, setValue] = useState(queryTitle);
    const [status, setStatus] = useState({fade: "fade", confirm: "confirm"})
    const inputElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    const handleStatus = (newStatus) => {
        setStatus({...status, ...newStatus});
    }

    const handleValue = (event) => {
        const value = event.target.value;
        setValue(value);
        handleStatus({fade: "", confirm: ""});
    };

    const handleQuery = (event) => {
        if (inputElement.current.validity.valid) {
            if(event.key === 'Enter') {
                handleStatus({confirm: "confirm"});
                let selection = appState.menuSelection;
                selection[level] = value;
                handleAppState({ menuSelection: selection });
                inputElement.current.blur();
            }
        }
    };

    const handleVisibility = () => {
        let selection = appState.menuSelection;
        if (depLevel < 0) {
            return true
        } else {
            return selection[depLevel] === depValue
        }
    }

    const recoverValue = (event) => {
        const value = event.target.value;
        if (value === "") {
            setValue(queryTitle);
            handleStatus({fade: "fade"});
        }
    }

    useEffect(() => {
        setValue(queryTitle);
        handleStatus({fade: "fade"});
    }, [appState.menuSelection[depLevel]])

    return <>
        {
            handleVisibility()
                ? <StyledQuery className={status.confirm}>
                    <input
                        className={status.fade}
                        ref={inputElement}
                        value={value}
                        onClick={() => { inputElement.current.select(); }}
                        onBlur={recoverValue}
                        onChange={handleValue}
                        onKeyDown={handleQuery}
                        type="text"
                        required
                    />
                </StyledQuery>
                : <></>
        }
    </>

}

export default Query;