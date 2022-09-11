import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledLoadingItem = styled(StyledItem)`
    position: relative;
    overflow: hidden;
    
    &:before {
        content: '';
        position: absolute;
        background-image: conic-gradient(transparent, transparent, transparent, yellow);
        width: 120%;
        height: 700%;
        animation: loading 2s ease-in-out infinite;
    }
    &:after {
        content: '';
        position: absolute;
        background-image: conic-gradient(transparent, transparent, transparent, rgb(255, 255, 255));
        width: 120%;
        height: 700%;
        animation: loading 2s ease-out infinite;
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes loading2 {
        0% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(540deg);
        }
    }

`;


export default StyledLoadingItem;