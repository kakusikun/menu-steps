import { useState } from "react";
import { useRef } from "react";
import { StyledAddress } from "./styles/StyledAddress.style";

function Address() {
    const [value, setValue] = useState("enter address with port");
    const inputElement = useRef();

    const handleValue = (event) => {
        const value = event.target.value;
        setValue(value);
    };

    const recoverValue = (event) => {
        const value = event.target.value;
        if (value === "") {
            setValue("enter address with port");
        }
    }

    return <StyledAddress>
        <input
            ref={inputElement}
            value={value}
            onClick={() => { inputElement.current.select(); }}
            onBlur={recoverValue}
            onChange={handleValue}
            pattern="([0-9]+).([0-9]+).([0-9]+).([0-9]+):([0-9]+)"
            required
        />
    </StyledAddress>
}

export { Address }