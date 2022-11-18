import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledTable = styled(StyledItem)`
    max-width: calc(100% - 45px);
    overflow-x: auto;

    table {
        width: 100%;
        display: block;
        font-size: small;
        border-color: white;
        white-space: nowrap;
    }

    tr:nth-child(even) {
        background-color: white;
        color: black;
    }

    th {
        width: 100%;
        line-height: 30px;
    }
    
    td {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid rgb(60, 60, 60);
        line-height: 50px;
        padding: 0 15px;
    }
    
`;

export default StyledTable;