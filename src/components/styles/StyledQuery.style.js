import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledQuery = styled(StyledItem)`
    align-items: flex-start;

    input {
        background: transparent;
        outline: 0;
        border: 0;
        color: rgb(155, 155, 155);
        font-family: sans-serif;
        letter-spacing: 2px;
        border-bottom: 1px solid white;
        width: 100%;
    }
    
    input:valid {
        color: white
    }

    input.fade {
        color: rgb(155, 155, 155);
    }

    &:after {
        content: "press 'enter' to confirm";
        font-size: xx-small;
        color: gray;
        transform: translateY(35%);
        text-align: right;
        width: 100%;
    }

    &.confirm:after {
        content: "confirm!";
        color: rgb(51 255 51);;
    }

`;

export default StyledQuery;