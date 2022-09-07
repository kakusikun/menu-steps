import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import AppCtx from "../AppContext";
import { StyledAddress } from "./styles/StyledAddress.style";

function Address() {
    const [value, setValue] = useState("enter address with port");
    const [status, setStatus] = useState({fade: "fade", confirm: false, check: ""})
    const inputElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    const handleStatus = (newStatus) => {
        setStatus({...status, ...newStatus});
    }

    const handleValue = (event) => {
        const value = event.target.value;
        setValue(value);
        handleStatus({fade: "", confirm: false, check: ""})
    };

    const handleAddress = (event) => {
        if (inputElement.current.validity.valid) {
            if(event.key === 'Enter') {
                handleStatus({confirm: true})
                handleAppState({server: value});
                inputElement.current.blur();
            }
        }
    };

    const recoverValue = (event) => {
        const value = event.target.value;
        if (value === "") {
            setValue("enter address with port");
        }
    }

    useEffect(() => {
        (async () => {
            if (status.confirm) {
                console.log('check');
                var res = await fetch('https://httpbin.org/status/400');
                try {
                    if (res.status === 200){
                        handleStatus({check: "check"});
                    } else {
                        handleStatus({check: "error"});
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        })()
    }, [status.confirm])

    return <StyledAddress className={status.check}>
        <input
            className={status.fade}
            ref={inputElement}
            value={value}
            onClick={() => { inputElement.current.select(); }}
            onBlur={recoverValue}
            onChange={handleValue}
            onKeyDown={handleAddress}
            pattern="([0-9]+).([0-9]+).([0-9]+).([0-9]+):([0-9]+)"
            required
        />
    </StyledAddress>
}

export { Address }