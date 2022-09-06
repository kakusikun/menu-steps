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
`;

const StyledMenuList = styled(StyledMenuTitle)`
    position: absolute;
    align-items: flex-start;
    z-index: 1000;
    top: 50px;
    overflow: hidden;
    animation-name: example;
    animation-duration: 1s;

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