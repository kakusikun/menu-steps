import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledMenu = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    width: 100%;
`;

const StyledMenuTitle = styled(StyledItem)`
    position: relative;
    cursor: pointer;
    transition: 1s;

    .hint {
        position: absolute;
        margin-left: 85%;
    }

    .opened-hint {
        position: absolute;
        margin-left: 85%;
        animation-name: rotate-down;
        animation-duration: 0.5s;
    }

    @keyframes rotate-down {
        from {transform: rotate(-180deg);}
        to {transform: rotate(0deg);}
    }

    .closed-hint {
        position: absolute;
        margin-left: 85%;
        animation-name: rotate-up;
        animation-duration: 0.5s;
    }

    @keyframes rotate-up {
        from {transform: rotate(180deg);}
        to {transform: rotate(0deg);}
    }
`;

const StyledMenuList = styled(StyledItem)`
    position: absolute;
    align-items: flex-start;
    justify-content: start;
    z-index: 1000;
    top: 50px;
    overflow: auto;
    overflow-x: hidden;
    animation-name: example;
    animation-duration: 1s;
    max-height: 33vh;
    padding: 10px 0px 10px 10px;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
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

    @keyframes example {
        from {transform: translateY(-20px);}
        to {transform: translateY(0px);}
    }

    .select {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid gray;
    }

    .select:hover {
        background-color: white;
        color: black;
    };

    .select:last-child {
        border: 0;
    }
}
`;

export {
    StyledMenu,
    StyledMenuTitle,
    StyledMenuList,
};