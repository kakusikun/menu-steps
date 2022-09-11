import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import AppCtx from "../AppContext";
import { StyledAddress } from "./styles/StyledAddress.style";
import { VscCircleLargeOutline, VscPassFilled, VscError } from "react-icons/vsc";
import StyledItem from "./styles/StyledItem.style";
import StyledPushItem from "./styles/StyledPushedItem.style";
import StyledLoadingItem from "./styles/StyledLoadingItem.style";

function Address() {
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
        handleStatus({ confirm: false, check: "none" })
    };


    const handleAddress = (event) => {
        if (inputElement.current.validity.valid) {
            handleStatus({ confirm: true })
            handleAppState({ server: value });
            inputElement.current.blur();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddress(event);
        }
    };

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
            console.log("handleBtn", status)
            return <StyledLoadingItem
                className="btn"
                onClick={handleAddress}
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
                    onClick={handleAddress}
                >
                    {handleCheck()}
                </StyledPushItem>
            } else {
                return <StyledItem
                    className="btn"
                    onClick={handleAddress}
                >
                    <VscCircleLargeOutline />
                </StyledItem>
            }
        }

    }

    useEffect(() => {
        if (status.confirm) {
            console.log('check');
            handleStatus({ loading: true });
            setTimeout((async () => {
                try {
                    let res = await fetch(appState.server);
                    if (res.status === 200) {
                        handleStatus({ check: "normal", loading: false });
                    } else {
                        handleStatus({ check: "error", loading: false });
                    }
                } catch (err) {
                    handleStatus({ check: "error", loading: false });
                    console.error(err)
                }
            }), 2000);
        }
    }, [status.confirm])

    return <StyledAddress>
        <input
            className={status.fade}
            ref={inputElement}
            value={value}
            placeholder="e.g., 127.0.0.1:8000"
            onClick={() => { inputElement.current.select(); }}
            onChange={handleValue}
            onKeyDown={handleKeyDown}
            // pattern="([0-9]+).([0-9]+).([0-9]+).([0-9]+):([0-9]+)"
            required
        />
        {handleBtn()}
    </StyledAddress>
}

export { Address }