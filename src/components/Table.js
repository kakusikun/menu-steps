import { useState } from "react";
import { useContext, useEffect } from "react";
import AppCtx from "../AppContext";
import StyledTable from "./styles/StyledTable.style";

function Table({ columnNames }) {
    const [table, setTable] = useState(null);
    const [tableType, setTableType] = useState("");
    const [appState, handleAppState] = useContext(AppCtx);

    const handleTable = () => {
        if (table === null) {
            return <></>
        } else {
            if (tableType === "array") {
                return <StyledTable>
                    <table rules="none">
                        <tbody>
                            <tr>
                                {columnNames.map((colName, index) => (
                                    <th key={index}>{colName}</th>
                                ))}
                            </tr>
                            {table.map((obj, index) => (
                                <tr key={index}>
                                    {columnNames.map((colName, cIndex) => (
                                        <td key={cIndex}>{obj[colName]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </StyledTable>
            } else if (tableType === "object") {
                return <StyledTable>
                    <table rules="none">
                        <tbody>
                            <tr>
                                <th>key</th>
                                <th>value</th>
                            </tr>
                            {Object.keys(table).map((colName, index) => (
                                <tr>
                                    <td key={colName}>{colName}</td>
                                    <td>{table[colName]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </StyledTable>
            } else if (tableType === "pure array") {
                return <StyledTable>
                    <table rules="none">
                        <tbody>
                            <tr>
                                <th>value</th>
                            </tr>
                            {table.map((value, index) => (
                                <tr>
                                    <td key={index}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </StyledTable>
            } else {
                return <></>
            }
        }
    }

    useEffect(() => {
        try {
            let tableObj = JSON.parse(appState.response);
            if (typeof tableObj === "object") {
                if (Array.isArray(tableObj)) {
                    if (tableObj.length > 0) {
                        let ok = 1;
                        try {
                            columnNames.forEach(colName => {
                                ok *= tableObj[0].hasOwnProperty(colName);
                            });
                        } catch (err) {
                            ok = 0;
                        }
                        if (ok > 0) {
                            setTableType("array");
                        } else {
                            setTableType("pure array");
                        }
                        setTable(tableObj);
                    } else {
                        setTableType("");
                        setTable(null);
                    }
                } else {
                    Object.keys(tableObj).forEach(key => {
                        tableObj[key] = JSON.stringify(tableObj[key], undefined, 4);
                    })
                    setTableType("object");
                    setTable(tableObj);
                }
            } else {
                tableObj = [JSON.stringify(tableObj, undefined, 4)];
                setTableType("pure array");
                setTable(tableObj);
            }
        } catch (err) {
            setTableType("");
            setTable(null);
        }
    }, [appState.response])

    return handleTable()
}

export default Table;