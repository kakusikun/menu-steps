import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import AppCtx from "../AppContext";
import { StyledAddress } from "./styles/StyledAddress.style";
import { VscCircleLargeOutline, VscPassFilled, VscError } from "react-icons/vsc";
import StyledItem from "./styles/StyledItem.style";
import StyledPushItem from "./styles/StyledPushedItem.style";

function Address() {
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
        handleStatus({ confirm: false, check: "none" })
    };

    const handleAddress = (event) => {
        if (inputElement.current.validity.valid) {
            if (event.key === 'Enter') {
                handleStatus({ confirm: true })
                handleAppState({ server: value });
                inputElement.current.blur();
            }
        }
    };

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
                console.log('check');
                try {
                    let res = await fetch('https://httpbin.org/status/400');
                    if (res.status === 200) {
                        handleStatus({ check: "normal" });
                    } else {
                        handleStatus({ check: "error" });
                    }
                } catch (err) {
                    handleStatus({ check: "error" });
                    console.error(err)
                }
            }
        })()
    }, [status.confirm])

    return <StyledAddress>
        <input
            className={status.fade}
            ref={inputElement}
            value={value}
            placeholder="enter address with port"
            onClick={() => { inputElement.current.select(); }}
            onChange={handleValue}
            onKeyDown={handleAddress}
            pattern="([0-9]+).([0-9]+).([0-9]+).([0-9]+):([0-9]+)"
            required
        />
        {
            status.confirm
                ? <StyledPushItem
                    className="btn">
                    {handleCheck(status.check)}
                </StyledPushItem>
                : <StyledItem
                    className="btn">
                    <VscCircleLargeOutline />
                </StyledItem>
        }
    </StyledAddress>
}

export { Address }