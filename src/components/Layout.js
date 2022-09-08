import { StyledLayout } from "./styles/StyledLayout.style"
import Menu from "./Menu";
import { Address } from "./Address";
import StyledItem from "./styles/StyledItem.style";
import { useContext } from "react";
import AppCtx from "../AppContext";
import FetchMenu from "./FetchMenu";
import Query from "./Query";
import ResponseArea from "./Response";
import PostJsonArea from "./PostJson";

function generateComponentArgs(info) {
    switch (info[0]) {
        case "menu":
            return { type: "menu", menuTitle: info[1], menuList: info[2] }
        case "fetch":
            return { type: "fetch", menuTitle: info[1], req: info[2] }
        case "query":
            return { type: "query", queryTitle: info[1], req: info[2] }
    }
}

function generateComponent(index, args){
    switch (args.type) {
        case "menu":
            return <Menu key={index} {...args} />
        case "fetch":
            return <FetchMenu key={index} {...args} />
        case "query":
            return <Query key={index} {...args} />
    }
}

function Layout() {
    const [appState, handleAppState] = useContext(AppCtx);
    const tree = [
        [
            "menu",
            "Topic",
            ["Topic 1", "Topic 2"]
        ],
        [
            [
                "menu",
                "Usage",
                ["Usage 1-1", "Usage 1-2"]
            ],
            [
                "menu",
                "Usage",
                ["Usage 2-1", "Usage 2-2"]
            ]
        ],
        [
            [
                [
                    "fetch",
                    "fetch 1",
                    { handleURL: (item) => `https://httpbin.org/status/${item}` }
                ],
                [
                    "query",
                    "query 2"
                ]
            ],
            [
                [
                    "fetch",
                    "fetch 3",
                ],
                [
                    "query",
                    "query 4",
                    { handleURL: (item) => `https://httpbin.org/status/${item}` }
                ]
            ]
        ]
    ]

    let LayoutInfo = []
    tree.forEach((subtree, level) => {
        switch (level) {
            case 0:
                let args = generateComponentArgs(subtree);
                args = { ...args, ...{ level: level, depLevel: level - 1, depValue: "" } };
                LayoutInfo.push(args);
                break
            case 1:
                subtree.forEach((info, i) => {
                    let args = generateComponentArgs(info);
                    args = { ...args, ...{ level: level, depLevel: level - 1, depValue: `${i}` } };
                    LayoutInfo.push(args);
                })
                break
            case 2:
                subtree.forEach((subtree2, i) => {
                    subtree2.forEach((info, j) => {
                        let args = generateComponentArgs(info);
                        args = { ...args, ...{ level: level, depLevel: level - 1, depValue: `${i}-${j}` } };
                        LayoutInfo.push(args);
                    })
                })
                break
        }
    })

    console.log(appState.server, appState.menuSelection);
    return <StyledLayout>
        <Address />
        {LayoutInfo.map((args, index) => (
            generateComponent(index, args)
        ))}
        
        <ResponseArea />
        <StyledItem>
            <p>{appState.server}</p>
            <p>{appState.menuSelection}</p>
        </StyledItem>
    </StyledLayout>
}

export default Layout;