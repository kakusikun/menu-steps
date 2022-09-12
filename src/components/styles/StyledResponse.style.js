import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledResponse = styled(StyledItem)`
    min-height: auto;
    border-radius: 5px 5px 20px 20px;
    position: relative;
    margin: 0;

    textarea {
        width: 100%;
        height: 30vh;
        border: none;
        overflow: auto;
        outline: none;
        background: transparent;
        color: white;
        resize: none;
        border-radius: 5px 5px 20px 20px;
        font-family: sans-serif;
        letter-spacing: 2px;
        box-shadow: -2px -2px 2px -1px rgb(255 255 255 / 50%) inset,
            25px 25px 55px rgb(0 0 0 / 45%) inset,
            -6px -6px 10px -1px rgb(255 255 255 / 5%),
            -21px -21px 33px rgb(255 255 255 / 6%) inset;

        /* width */
        ::-webkit-scrollbar {
            width: 20px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: rgb(26, 26, 26); 
            border-radius: 5px;
            box-shadow: 1px 1px rgba(255, 255, 255, 0.4) inset;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: rgb(26, 26, 26);; 
        }
    }
`;

export default StyledResponse;