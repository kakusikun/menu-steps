import { StyledLayout } from "./styles/StyledLayout.style"
import Menu from "./Menu";
import { Address } from "./Address";
import StyledItem from "./styles/StyledItem.style";
import { useContext } from "react";
import AppCtx from "../AppContext";
import FetchMenu from "./FetchMenu";
import Query from "./Query";
import ResponseArea from "./Response";

function Layout() {
    const [appState, handleAppState] = useContext(AppCtx);
    const Tppics = [
        "Topic 1", "Topic 2"
    ]
    const Usages = [
        ["Usage 1-1", "Usage 1-2"],
        ["Usage 2-1", "Usage 2-2"]
    ]
    const Choices = [
        [
            ["Fetch", "fetch 1", {handleURL: (item) => `https://httpbin.org/status/${item}`}],
            ["Query", "query 2"],
        ],
        [
            ["Fetch", "fetch 3", null],
            ["Query", "query 4"]
        ]
    ]

    let LayoutMenuInfo = []
    let LayoutFetchMenuInfo = []
    let LayoutQueryInfo = []
    
    LayoutMenuInfo.push({ level: 0, depLevel: -1, depValue: "", menuTitle: "Topic", menuList: Tppics})

    Usages.map((a, i)=>(
        LayoutMenuInfo.push({ level: 1, depLevel: 0, depValue: `${i}`, menuTitle: "Usage", menuList: a})
    ))

    Choices.map((a, i)=>(
        a.map((b, j) => (
            b[0] === "Fetch" ? LayoutFetchMenuInfo.push({ level: 2, depLevel: 1, depValue: `${i}-${j}`, menuTitle: b[1], req: b[2]}) : null
        ))
    ))

    Choices.map((a, i)=>(
        a.map((b, j) => (
            b[0] === "Query" ? LayoutQueryInfo.push({ level: 2, depLevel: 1, depValue: `${i}-${j}`, queryTitle: b[1]}) : null
        ))
    ))

    console.log(appState.server, appState.menuSelection);
    return <StyledLayout>
        <Address />
        {LayoutMenuInfo.map((info, index) => (
            <Menu key={index} {...info} />
        ))}
        {LayoutFetchMenuInfo.map((info, index) => (
            <FetchMenu key={index} {...info} />
        ))}
        {LayoutQueryInfo.map((info, index) => (
            <Query key={index} {...info} />
        ))}

        <ResponseArea />
        <StyledItem>
            <p>{appState.server}</p>
            <p>{appState.menuSelection}</p>
        </StyledItem>
    </StyledLayout>
}

export default Layout;