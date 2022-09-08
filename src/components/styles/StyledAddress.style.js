import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledAddress = styled(StyledItem)`
    flex-direction: row;
    justify-content: space-around;
    border: 0;
    background: transparent;
    box-shadow: -2px -2px 2px -1px rgb(255 255 255 / 50%) inset,
        25px 25px 55px rgb(0 0 0 / 45%) inset,
        -6px -6px 10px -1px rgb(255 255 255 / 5%),
        -21px -21px 33px rgb(255 255 255 / 6%) inset;

    input {
        background: transparent;
        outline: 0;
        border: 0;
        color: rgb(155, 155, 155);
        font-family: sans-serif;
        letter-spacing: 2px;
        text-align: center;
        width: 80%;
        height: 5vh;
        border-bottom: 1px solid white;
    }

    input:valid {
        color: white;
    }

    .btn {
        margin-bottom: 0;
        width: 15%;
        font-size: x-large;
    }

    .normal {
        color: #00eb00;
    }

    .error {
        color: #eb0000;
    }

    ${'' /* &:after {
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
    } */}
`;

export { StyledAddress };