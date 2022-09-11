import { useContext, useEffect, useRef, useState } from "react";
import AppCtx from "../AppContext";
import StyledItem from "./styles/StyledItem.style";
import { StyledQuery } from "./styles/StyledQuery.style";
import { VscCircleLargeOutline, VscPassFilled, VscError } from "react-icons/vsc";
import StyledPushItem from "./styles/StyledPushedItem.style";
import StyledLoadingItem from "./styles/StyledLoadingItem.style";

function Query({ level, depLevel, depValue, queryTitle, req }) {
    const title = queryTitle;
    const [value, setValue] = useState("");
    const [status, setStatus] = useState({ confirm: false, check: "none", loading: false })
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

    const handleCheck = () => {
        switch (status.check) {
            case "none":
                return <VscCircleLargeOutline />
            case "normal":
                return <VscPassFilled className="normal" />
            case "error":
                return <VscError className="error" />
            default:
                break
        }
    }

    const handleBtn = () => {
        if (status.loading) {
            return <StyledLoadingItem
                className="btn"
                onClick={handleQuery}
            >
                <span>
                    <VscCircleLargeOutline />
                </span>
            </StyledLoadingItem>
        } else {
            if (status.check !== "none") {
                return <StyledPushItem
                    tabindex={2}
                    className="btn pushed"
                    onClick={handleQuery}
                >
                    {handleCheck()}
                </StyledPushItem>
            } else {
                return <StyledItem
                    className="btn"
                    onClick={handleQuery}
                >
                    <VscCircleLargeOutline />
                </StyledItem>
            }
        }

    }

    useEffect(() => {
        if (status.confirm) {
            if (req !== null && req !== undefined) {
                console.log('query');
                handleStatus({ loading: true });
                setTimeout((async () => {
                    try {
                        let res = await fetch(req.handleResource(value), req.options);
                        if (res.status === 200) {
                            handleStatus({ check: "normal", loading: false });
                        } else {
                            handleStatus({ check: "error", loading: false });
                        }
                        handleAppState({ response: res });
                    } catch (err) {
                        handleStatus({ check: "error", loading: false });
                        console.error(err)
                    }
                }), 2000);
            } else {
                handleStatus({ check: "normal" });
            }
        }
    }, [status.confirm])

    return <>
        {
            handleVisibility()
                ? <StyledQuery>
                    <div className="input-container">
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
                    </div>
                    {handleBtn()}
                </StyledQuery>
                : <></>
        }
    </>

}

export default Query;