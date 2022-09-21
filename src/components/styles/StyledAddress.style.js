import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledAddress = styled(StyledItem)`
    position: relative;
    flex-direction: row;
    justify-content: space-around;
    border: 0;
    background: transparent;
    border-radius: 20px;
    box-shadow: -2px -2px 2px -1px rgba(255, 255, 255, 0.5) inset,
        25px 25px 55px rgba(0, 0, 0, 0.45) inset,
        -6px -6px 10px -1px rgba(255, 255, 255, 0.05),
        -21px -21px 33px rgba(255, 255, 255, 0.06) inset;

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
        font-size: large;
        border-bottom: 1px solid white;
    }

    input:valid {
        color: white;
    }

    .btn {
        cursor: pointer;
        ${'' /* position: absolute; */}
        margin-bottom: 0;
        width: 5vh;
        height: 5vh;
        ${'' /* right: 15px; */}
        font-size: large;
        ${'' /* background: transparent; */}
        ${'' /* box-shadow: none; */}
        border-radius: 30px;
        background-color: rgb(40, 40, 40);
    }

    .btn.pushed {
        box-shadow: -2px -2px 2px -1px rgba(255, 255, 255, 0.5) inset,
            25px 25px 55px rgba(0, 0, 0, 0.45) inset,
            -21px -21px 33px rgba(255, 255, 255, 0.06) inset;
    }

    span {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        inset: 3px;
        border-radius: 30px;
        background-color: rgb(40, 40, 40);
        z-index: 1;
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