import styled from "styled-components/macro";
import StyledItem from "./StyledItem.style";

const StyledTable = styled(StyledItem)`
    max-width: calc(100% - 45px);
    overflow: auto;

    table {
        width: 100%;
        font-size: small;
        border-color: white;
    }

    tr:nth-child(even) {
        background-color: white;
        color: black;
    }

    th {
        line-height: 30px;
    }
    
    td {
        text-align: center;
        border-bottom: 1px solid rgb(60, 60, 60);
        line-height: 50px;
    }
    
`;

export default StyledTable;