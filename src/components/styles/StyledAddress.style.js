import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledAddress = styled(StyledItem)`
    border: 0;
    background: transparent;
    box-shadow: 0px 0px;
    input {
        background: transparent;
        outline: 0;
        border: 0;
        color: rgb(155, 155, 155);
        font-family: sans-serif;
        letter-spacing: 2px;
        text-align: center;
        border-bottom: 1px solid white;
        width: 100%;
    }

    input:valid {
        color: white;
    }

    &:after {
        content: "press 'enter' to check";
        font-size: xx-small;
        color: gray;
        transform: translateY(35%);
        text-align: right;
        width: 100%;
    }

    &.check:after {
        content: "checked!";
        color: rgb(51 255 51);;
    }

    &.error:after {
        content: "error!";
        color: red;
    }
`;

export { StyledAddress };