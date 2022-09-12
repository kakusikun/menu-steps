import { useContext, useEffect, useRef, useState } from "react";
import AppCtx from "../AppContext";
import StyledItem from "./styles/StyledItem.style";
import { StyledQuery } from "./styles/StyledQuery.style";
import { VscPassFilled, VscError, VscCloudUpload, VscCircleLargeOutline } from "react-icons/vsc";
import StyledLoadingItem from "./styles/StyledLoadingItem.style";

function Query({ level, depLevel, depValue, index, queryTitle, req }) {
    const title = queryTitle;
    const [queryValue, setQueryValue] = useState("");
    const [status, setStatus] = useState({ confirm: false, check: "none", loading: false })
    const inputElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    const handleStatus = (newStatus) => {
        setStatus({ ...status, ...newStatus });
    }

    const handleValue = (event) => {
        if (status.confirm) {
            let selection = appState.menuSelection;
            let menuValue = appState.menuValue;
            for (let i = level; i < selection.length; i++) {
                selection[i] = "";
                menuValue[i] = "";
            }
            handleAppState({ menuValue: menuValue, menuSelection: selection });
        }
        handleStatus({ confirm: false, check: "none" });
        const value = event.target.value;
        setQueryValue(value);
    };

    const handleQuery = (event) => {
        if (inputElement.current.validity.valid) {
            handleStatus({ confirm: true });
            let selection = appState.menuSelection;
            let menuValue = appState.menuValue;
            menuValue[level] = queryValue;
            selection[level] = `${depValue}-${index}`;
            handleAppState({ menuValue: menuValue, menuSelection: selection });
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
                return <VscCloudUpload />
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
            if (req !== null && req !== undefined) {
                return <StyledLoadingItem
                    className="btn"
                    onClick={handleQuery}
                >
                    <span>
                        <VscCloudUpload />
                    </span>
                </StyledLoadingItem>
            }
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
                return <StyledItem
                    tabindex={2}
                    className="btn pushed"
                    onClick={handleQuery}
                >
                    {handleCheck()}
                </StyledItem>
            } else {
                if (req !== null && req !== undefined) {
                    return <StyledItem
                        className="btn"
                        onClick={handleQuery}
                    >
                        <VscCloudUpload />
                    </StyledItem>
                }
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
                        let res = await fetch(
                            req.handleResource(queryValue),
                            req.handleOptions(queryValue)
                        );
                        let result = await req.handleResponse(res);
                        if (res.status === 200) {
                            handleStatus({ check: "normal", loading: false });
                        } else {
                            handleStatus({ check: "error", loading: false });
                        }
                        handleAppState({ response: result });
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
                            value={queryValue}
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