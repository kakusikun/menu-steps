import { StyledLayout } from "./styles/StyledLayout.style"
import Menu from "./Menu";
import { Address } from "./Address";
import { useContext } from "react";
import AppCtx from "../AppContext";
import FetchMenu from "./FetchMenu";
import Query from "./Query";
import ResponseArea from "./Response";
import PostJsonArea from "./PostJson";
import StyledLoadingItem from "./styles/StyledLoadingItem.style";

function generateComponentArgs(info) {
    switch (info[0]) {
        case "menu":
            return { type: "menu", menuTitle: info[1], menuList: info[2] }
        case "fetch":
            return { type: "fetch", menuTitle: info[1], listReq: info[2], req: info[3] }
        case "query":
            return { type: "query", queryTitle: info[1], req: info[2] }
        default:
            break
    }
}

function generateComponent(index, args) {
    switch (args.type) {
        case "menu":
            return <Menu key={index} {...args} />
        case "fetch":
            return <FetchMenu key={index} {...args} />
        case "query":
            return <Query key={index} {...args} />
        default:
            break
    }
}

function Layout() {
    const [appState, handleAppState] = useContext(AppCtx);
    const tree = [
        [
            "menu",
            "Topic",
            ["Topic 1", "Topic 2", "Topic 2", "Topic 2", "Topic 2"]
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
                    {
                        handleResource: () => `${appState.server}/anything`,
                        options: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ test: [200, 400] })
                        },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData.json.test
                        })
                    },
                    { handleResource: (item) => `${appState.server}/status/${item}` }
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
                    {
                        handleResource: () => `${appState.server}/anything`,
                        options: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ test: [202, 404] })
                        },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData.json.test
                        })
                    },
                    { handleResource: (item) => `${appState.server}/status/${item}` }
                ],
                [
                    "query",
                    "query 4",
                    { handleResource: (item) => `${appState.server}/status/${item}` }
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
            default:
                break
        }
    })

    console.log(appState.server, appState.menuSelection, appState.response);
    return <StyledLayout>
        <Address />
        {LayoutInfo.map((args, index) => (
            generateComponent(index, args)
        ))}
        <PostJsonArea />
        {/* <ResponseArea /> */}
    </StyledLayout>
}

export default Layout;