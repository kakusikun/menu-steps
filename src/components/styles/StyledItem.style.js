import styled from "styled-components/macro";

const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    width: 100%;
    min-height: 5vh;
    background-color: rgb(26, 26, 26);
    border-radius: 5px;
    font-family: sans-serif;
    color: white;
    padding: 10px;
    font-weight: 500;
    margin-bottom: 10px;
    box-shadow: 1px 1px rgba(255, 255, 255, 0.4) inset;
    letter-spacing: 2px;

    .pushed {
        box-shadow: -2px -2px 2px -1px rgba(255, 255, 255, 0.05) inset,
            25px 25px 55px rgba(0, 0, 0, 0.45) inset,
            -6px -6px 10px -1px rgba(255, 255, 255, 0.05),
            -21px -21px 33px rgba(255, 255, 255, 0.06) inset;
    }
`;


export default StyledItem;