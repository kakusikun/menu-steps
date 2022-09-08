import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledQuery = styled(StyledItem)`
    flex-direction: row;
    justify-content: space-around;

    input {
        background: transparent;
        outline: 0;
        border: 0;
        border-radius: 5px;
        color: rgb(155, 155, 155);
        font-family: sans-serif;
        letter-spacing: 2px;
        text-align: center;
        box-shadow: -2px -2px 2px -1px rgb(255 255 255 / 50%) inset,
            25px 25px 55px rgb(0 0 0 / 45%) inset,
            -6px -6px 10px -1px rgb(255 255 255 / 5%),
            -21px -21px 33px rgb(255 255 255 / 6%) inset;
        width: 80%;
        height: 5vh;
    }
    
    input:valid {
        color: white
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

`;

export {StyledQuery};