import { useContext, useEffect, useRef, useState } from "react";
import AppCtx from "../AppContext";
import StyledItem from "./styles/StyledItem.style";
import { StyledQuery } from "./styles/StyledQuery.style";
import { VscCircleLargeOutline, VscPassFilled, VscError } from "react-icons/vsc";
import StyledPushItem from "./styles/StyledPushedItem.style";

function Query({ level, depLevel, depValue, queryTitle, req }) {
    const title = queryTitle;
    const [value, setValue] = useState("");
    const [status, setStatus] = useState({ confirm: false, check: "none" })
    const inputElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    const handleStatus = (newStatus) => {
        setStatus({ ...status, ...newStatus });
    }

    const handleValue = (event) => {
        const value = event.target.value;
        setValue(value);
        handleStatus({ confirm: false, check: "none" });
    };

    const handleQuery = (event) => {
        if (inputElement.current.validity.valid) {
            handleStatus({ confirm: true });
            let selection = appState.menuSelection;
            selection[level] = value;
            handleAppState({ menuSelection: selection });
            inputElement.current.blur();
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleQuery(event);
        }
    }

    const handleCheck = (check) => {
        switch(check) {
            case "none":
                return <VscCircleLargeOutline />
            case "normal":
                return <VscPassFilled className="normal" />
            case "error":
                return <VscError className="error" />
        }
    }
    
    useEffect(() => {
        (async () => {
            if (status.confirm) {
                if (req !== null && req !== undefined) {
                    console.log('query');
                    try {
                        let res = await fetch(req.handleURL(value));
                        if (res.status === 200) {
                            handleStatus({ check: "normal" });
                        } else {
                            handleStatus({ check: "error" });
                        }
                        handleAppState({ response: res.status });
                    } catch (err) {
                        handleStatus({ check: "error" });
                        console.error(err)
                    }
                } else {
                    handleStatus({ check: "normal" });
                }
            }
        })()
    }, [status.confirm])

    return <>
        {
            handleVisibility()
                ? <StyledQuery>
                    <input
                        ref={inputElement}
                        value={value}
                        placeholder={title}
                        onClick={() => { inputElement.current.select(); }}
                        onChange={handleValue}
                        onKeyDown={handleKeyDown}
                        type="text"
                        required
                    />
                    {
                        status.confirm
                            ? <StyledPushItem
                                className="btn"
                                onClick={handleQuery}
                            >
                                {handleCheck(status.check)}
                            </StyledPushItem>
                            : <StyledItem
                                className="btn"
                                onClick={handleQuery}
                            >
                                <VscCircleLargeOutline />
                            </StyledItem>
                    }
                </StyledQuery>
                : <></>
        }
    </>

}

export default Query;