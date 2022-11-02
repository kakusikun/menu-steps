import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledQuery = styled(StyledItem)`

    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;
    border-radius: 20px;
    overflow: hidden;

    .input-container {
        position: relative;
        width: calc(100% - 45px);
        left: 3%;
        background-color: rgb(26, 26, 26);
        overflow: hidden;
    }

    .input-container:after {
        content: "";
        position: absolute;
        background-color: rgb(26, 26, 26);
        border-radius: 50px 0px 0px 50px;
        height: 30px;
        width: 30px;
        transform: translate(-35%, -1%);
        box-shadow: 1px 1px rgba(255, 255, 255, 0.4) inset;
        z-index: 3;
    }

    input {
        background: transparent;
        outline: 0;
        border: 0;
        border-radius: 20px 0px 0px 20px;
        color: rgb(155, 155, 155);
        font-family: sans-serif;
        letter-spacing: 2px;
        padding-left: 10px;
        text-align: left;
        box-shadow: 0px -2px 2px -1px rgba(255, 255, 255, 0.05) inset,
            25px 25px 55px rgba(0, 0, 0, 0.45) inset,
            -21px -21px 33px rgba(255, 255, 255, 0.06) inset;
        width: 100%;
        height: 30px;
    }
    
    input:valid {
        color: white
    }

    .btn {
        position: absolute;
        padding: 0;
        right: 10px;
        cursor: pointer;
        margin-bottom: 0;
        width: 25px;
        height: 25px;
        min-height: unset;
        font-size: large;
        ${'' /* background: transparent; */}
        ${'' /* box-shadow: none; */}
        border-radius: 30px;
        ${'' /* z-index: 5; */}
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
        ${'' /* z-index: 1001; */}
    }

    .error {
        color: #eb0000;
        ${'' /* z-index: 1001; */}
    }

`;

export {StyledQuery};