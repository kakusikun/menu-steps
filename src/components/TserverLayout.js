import { StyledLayout } from "./styles/StyledLayout.style"
import Menu from "./Menu";
import { Address } from "./Address";
import { useContext } from "react";
import AppCtx from "../AppContext";
import FetchMenu from "./FetchMenu";
import Query from "./Query";
import ResponseArea from "./Response";
import PostJsonArea from "./PostJson";
import Table from "./Table";

function generateComponentArgs(info) {
    switch (info[0]) {
        case "menu":
            return { type: "menu", menuTitle: info[1], menuList: info[2], req: info[3] }
        case "fetch":
            return { type: "fetch", menuTitle: info[1], listReq: info[2], req: info[3] }
        case "query":
            return { type: "query", queryTitle: info[1], req: info[2] }
        case "post-json":
            return { type: "post-json", postTitle: info[1], req: info[2] }
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
        case "post-json":
            return <PostJsonArea key={index} {...args} />
        default:
            break
    }
}

function TserverLayout() {
    const [appState, handleAppState] = useContext(AppCtx);

    const TserverTree = [
        [
            "menu",
            "Topic",
            ["Basic", "System", "Heart", "Bulletin", "Phone", "AICore", "Member", "Signage"]
        ],
        [
            [
                "menu",
                "Usage",
                ["get version", "get port"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/version`,
                            `${appState.server}/ports`
                        ][index]
                    },
                    handleOptions: () => { },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get latest system log", "get system logs", "get system info"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/sys-logs`,
                            "",
                            `${appState.server}/sys-info`,
                        ][index]
                    },
                    handleOptions: () => { },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get all hearts", "get heartbeat"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/troom/hearts`,
                            "",
                        ][index]
                    },
                    handleOptions: () => { },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get all bulletins", "get bulletin content", "write existing bulletin", "write new bulletin"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/troom/bulletins`,
                            "",
                            "",
                            "",
                        ][index]
                    },
                    handleOptions: () => { return {} },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get all phones", "get phone owner", "call out"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/troom/phones`,
                            "",
                            "",
                        ][index]
                    },
                    handleOptions: () => { },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get supported apps", "get cross", "get slaves", "get slaves status", "get master", "get msp", "update cross", "add slaves", "update master", "update msp", "delete master"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/aicore/supported-apps`,
                            `${appState.server}/aicore/cross`,
                            `${appState.server}/aicore/cross/slaves`,
                            `${appState.server}/troom/bulletin/cross-slaves`,
                            `${appState.server}/aicore/cross/master`,
                            `${appState.server}/aicore/msp`,
                            "",
                            "",
                            "",
                            "",
                            `${appState.server}/aicore/cross/master`,
                        ][index]
                    },
                    handleOptions: (index, item) => {
                        return [
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                                method: 'DELETE',
                            }
                        ][index]
                    },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get all members", "get member bulletins", "get member phones"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/troom/members`,
                            "",
                            "",
                        ][index]
                    },
                    handleOptions: () => { return {} },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
            [
                "menu",
                "Usage",
                ["get next view", "set and get next view", "get playing view", "get all views", "get view", "get all views with tag", "get views by tag", "get last view", "get view history"],
                {
                    handleResource: (index, item) => {
                        return [
                            `${appState.server}/signage/next-view`,
                            "",
                            `${appState.server}/signage/playing-view`,
                            `${appState.server}/signage/views`,
                            "",
                            `${appState.server}/signage/recomm-views`,
                            "",
                            `${appState.server}/signage/last-views`,
                            "",
                        ][index]
                    },
                    handleOptions: () => { return {} },
                    handleResponse: (async (res) => {
                        let jsonData = await res.json();
                        return JSON.stringify(jsonData, undefined, 4)
                    }),
                }
            ],
        ],
        [
            [
                [
                    null
                ]
            ],
            [
                [
                    null
                ],
                [
                    "query",
                    "number of logs",
                    {
                        handleResource: (item) => `${appState.server}/sys-logs/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    null
                ]
            ],
            [
                [
                    null
                ],
                [
                    "fetch",
                    "heart",
                    {
                        handleResource: () => `${appState.server}/troom/hearts`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    {
                        handleResource: (index, item) => `${appState.server}/troom/heart/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ]
            ],
            [
                [
                    null
                ],
                [
                    "fetch",
                    "bulletin",
                    {
                        handleResource: () => `${appState.server}/troom/bulletins`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    {
                        handleResource: (index, item) => `${appState.server}/troom/bulletin/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    "fetch",
                    "bulletin",
                    {
                        handleResource: () => `${appState.server}/troom/bulletins`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    null,
                ],
                [
                    "query",
                    "bulletin name",
                    null
                ],
            ],
            [
                [
                    null
                ],
                [
                    "fetch",
                    "phone",
                    {
                        handleResource: () => `${appState.server}/troom/phones`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    {
                        handleResource: (index, item) => `${appState.server}/troom/phone/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    "fetch",
                    "phone",
                    {
                        handleResource: () => `${appState.server}/troom/phones`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                ],

            ],
            [
                [
                    null
                ],
                [
                    null
                ],
                [
                    null
                ],
                [
                    null
                ],
                [
                    null
                ],
                [
                    null
                ],
                [
                    "post-json",
                    "write cross",
                    {
                        handleResource: () => `${appState.server}/aicore/cross`,
                        handleOptions: (value) => {
                            return {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(value)
                            }
                        },
                        handleResponse: (async (res) => {
                            return res.status
                        })
                    }
                ],
                [
                    "post-json",
                    "add slaves",
                    {
                        handleResource: () => `${appState.server}/aicore/cross/slaves`,
                        handleOptions: (value) => {
                            return {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(value)
                            }
                        },
                        handleResponse: (async (res) => {
                            return res.status
                        })
                    }
                ],
                [
                    "post-json",
                    "write master",
                    {
                        handleResource: () => `${appState.server}/aicore/cross/master`,
                        handleOptions: (value) => {
                            return {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(value)
                            }
                        },
                        handleResponse: (async (res) => {
                            return res.status
                        })
                    }
                ],
                [
                    "post-json",
                    "write msp",
                    {
                        handleResource: (item) => `${appState.server}/aicore/cross/msp`,
                        handleOptions: (value) => {
                            return {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(value)
                            }
                        },
                        handleResponse: (async (res) => {
                            return res.status
                        })
                    }
                ],
            ],
            [
                [
                    null
                ],
                [
                    "fetch",
                    "member",
                    {
                        handleResource: (item) => `${appState.server}/troom/members`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    {
                        handleResource: (index, item) => `${appState.server}/troom/member/${item}/bulletins`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    "fetch",
                    "member",
                    {
                        handleResource: (item) => `${appState.server}/troom/members`,
                        handleOptions: () => { },
                        handleList: (async (res) => {
                            let jsonData = await res.json();
                            return jsonData
                        }),
                    },
                    {
                        handleResource: (index, item) => `${appState.server}/troom/member/${item}/phones`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ]
            ],
            [
                [
                    null
                ],
                [
                    "query",
                    "aid",
                    {
                        handleResource: (item) => `${appState.server}/signage/next-view/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    null
                ],
                [
                    null
                ],
                [
                    "query",
                    "aid",
                    {
                        handleResource: (item) => `${appState.server}/signage/views/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    null
                ],
                [
                    "query",
                    "tag",
                    {
                        handleResource: (item) => `${appState.server}/signage/recomm-views/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
                [
                    null
                ],
                [
                    "query",
                    "number of views",
                    {
                        handleResource: (item) => `${appState.server}/signage/last-views/${item}`,
                        handleOptions: () => { return {} },
                        handleResponse: (async (res) => {
                            let jsonData = await res.json();
                            return JSON.stringify(jsonData, undefined, 4)
                        }),
                    }
                ],
            ]
        ],
        [
            [
                [
                    [

                    ]
                ]
            ],
            [
                [
                    [

                    ]
                ]
            ],
            [
                [
                    [

                    ]
                ]
            ],
            [
                [
                    [
                        null
                    ]
                ],
                [
                    [
                        null
                    ]
                ],
                [
                    [
                        null
                    ],
                    [
                        null
                    ],
                    [
                        "post-json",
                        "write bulletin",
                        {
                            handleResource: (item) => `${appState.server}/troom/bulletin/${item}`,
                            handleOptions: (value) => {
                                return {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(value)
                                }
                            },
                            handleResponse: (async (res) => {
                                return res.status
                            })
                        }
                    ],
                    [
                        null
                    ]
                ],
                [
                    [
                        null
                    ],
                    [
                        null
                    ],
                    [
                        null
                    ],
                    [
                        "post-json",
                        "write new bulletin",
                        {
                            handleResource: (item) => `${appState.server}/troom/bulletin/${item}`,
                            handleOptions: (value) => {
                                return {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(value)
                                }
                            },
                            handleResponse: (async (res) => {
                                return res.status
                            })
                        }
                    ],
                ]
            ],
            [
                [
                    [
                        null
                    ]
                ],
                [
                    [
                        null
                    ]
                ],
                [
                    [
                        null
                    ],
                    [
                        null
                    ],
                    [
                        "post-json",
                        "call out",
                        {
                            handleResource: (item) => `${appState.server}/troom/phone/${item}`,
                            handleOptions: (value) => {
                                return {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(value)
                                }
                            },
                            handleResponse: (async (res) => {
                                return res.status
                            })
                        }
                    ],
                ],
            ],
            [
                [
                    [

                    ]
                ]
            ],
        ]
    ]

    let LayoutInfo = []
    TserverTree.forEach((subtree, level) => {
        switch (level) {
            case 0:
                let args = generateComponentArgs(subtree);
                args = { ...args, ...{ level: level, depLevel: level - 1, depValue: "" } };
                LayoutInfo.push(args);
                break
            case 1:
                subtree.forEach((info, i) => {
                    let args = generateComponentArgs(info);
                    args = { ...args, ...{ level: level, depLevel: level - 1, depValue: `${i}`, index: i } };
                    LayoutInfo.push(args);
                })
                break
            case 2:
                subtree.forEach((subtree2, i) => {
                    subtree2.forEach((info, j) => {
                        let args = generateComponentArgs(info);
                        args = { ...args, ...{ level: level, depLevel: level - 1, depValue: `${i}-${j}`, index: j } };
                        LayoutInfo.push(args);
                    })
                })
                break
            case 3:
                subtree.forEach((subtree2, i) => {
                    subtree2.forEach((subtree3, j) => {
                        subtree3.forEach((info, k) => {
                            let args = generateComponentArgs(info);
                            args = { ...args, ...{ level: level, depLevel: level - 1, depValue: `${i}-${j}-*`, index: k } };
                            LayoutInfo.push(args);
                        })
                    })
                })
                break
            default:
                break
        }
    })

    console.log(appState.server, appState.menuSelection, appState.menuValue);
    return <StyledLayout>
        <Address />
        {
            appState.server !== ""
                ? LayoutInfo.map((args, index) => (
                    generateComponent(index, args)
                ))
                : <></>
        }
        <Table columnNames={["time", "who", "code", "msg"]}/>
        <ResponseArea />
    </StyledLayout>
}

export default TserverLayout;