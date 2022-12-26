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

    const L2_1 = [
        "menu",
        "Usage",
        [
            "get version",
            "get port"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/version`,
                    `${appState.server}/api/v2/ports`
                ][index]
            },
            handleOptions: () => { },
            handleResponse: (async (res) => {
                let jsonData = await res.json();
                return JSON.stringify(jsonData, undefined, 4)
            }),
        }
    ];

    const L2_2 = [
        "menu",
        "Usage",
        [
            "get latest system log",
            "get system logs",
            "get system info"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/sys/logs`,
                    "",
                    `${appState.server}/api/v2/sys/info`,
                ][index]
            },
            handleOptions: () => { },
            handleResponse: (async (res) => {
                let jsonData = await res.json();
                return JSON.stringify(jsonData, undefined, 4)
            }),
        }
    ];

    const L2_3 = [
        "menu",
        "Usage",
        [
            "get all hearts",
            "get heartbeat"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/troom/hearts`,
                    "",
                ][index]
            },
            handleOptions: () => { },
            handleResponse: (async (res) => {
                let jsonData = await res.json();
                return JSON.stringify(jsonData, undefined, 4)
            }),
        }
    ];

    const L2_4 = [
        "menu",
        "Usage",
        [
            "get all bulletins",
            "get bulletin content",
            "write existing bulletin",
            "write new bulletin"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/troom/bulletins`,
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
    ];

    const L2_5 = [
        "menu",
        "Usage",
        [
            "get all phones",
            "get phone owner",
            "call out"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/troom/phones`,
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
    ];

    const L2_6 = [
        "menu",
        "Usage",
        [
            "get system modes",
            "get cross",
            "get slaves",
            "get slaves status",
            "get master",
            "get msp",
            "update cross",
            "add slaves",
            "update master",
            "update msp",
            "delete master"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/aicore/systems`,
                    `${appState.server}/api/v2/aicore/cross`,
                    `${appState.server}/api/v2/aicore/cross/slaves`,
                    `${appState.server}/api/v2/troom/bulletin/cross-slaves`,
                    `${appState.server}/api/v2/aicore/cross/master`,
                    `${appState.server}/api/v2/aicore/msp`,
                    "",
                    "",
                    "",
                    "",
                    `${appState.server}/api/v2/aicore/cross/master`,
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
    ];

    const L2_7 = [
        "menu",
        "Usage",
        [
            "get all members",
            "get member bulletins",
            "get member phones"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/troom/members`,
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
    ];

    const L2_8 = [
        "menu",
        "Usage",
        [
            "get next view",
            "set and get next view",
            "get playing view",
            "get all views",
            "get view",
            "get all views with tag",
            "get views by tag",
            "get last view",
            "get view history"
        ],
        {
            handleResource: (index, item) => {
                return [
                    `${appState.server}/api/v2/signage/next-view`,
                    "",
                    `${appState.server}/api/v2/signage/playing-view`,
                    `${appState.server}/api/v2/signage/views`,
                    "",
                    `${appState.server}/api/v2/signage/recomm-views`,
                    "",
                    `${appState.server}/api/v2/signage/last-views`,
                    "",
                ][index]
            },
            handleOptions: () => { return {} },
            handleResponse: (async (res) => {
                let jsonData = await res.json();
                return JSON.stringify(jsonData, undefined, 4)
            }),
        }
    ];

    const L3_N = [null];

    const L3_1 = [L3_N];

    const L3_2 = [
        L3_N,
        [
            "query",
            "number of logs",
            {
                handleResource: (item) => `${appState.server}/api/v2/sys/logs/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ],
        L3_N
    ]

    const L3_3 = [
        L3_N,
        [
            "fetch",
            "heart",
            {
                handleResource: () => `${appState.server}/api/v2/troom/hearts`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
            {
                handleResource: (index, item) => `${appState.server}/api/v2/troom/heart/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ]
    ];

    const L3_4 = [
        L3_N,
        [
            "fetch",
            "bulletin",
            {
                handleResource: () => `${appState.server}/api/v2/troom/bulletins`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
            {
                handleResource: (index, item) => `${appState.server}/api/v2/troom/bulletin/${item}`,
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
                handleResource: () => `${appState.server}/api/v2/troom/bulletins`,
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
    ];

    const L3_5 = [
        L3_N,
        [
            "fetch",
            "phone",
            {
                handleResource: () => `${appState.server}/api/v2/troom/phones`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
            {
                handleResource: (index, item) => `${appState.server}/api/v2/troom/phone/${item}`,
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
                handleResource: () => `${appState.server}/api/v2/troom/phones`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
        ],
    ];

    const L3_6 = [
        L3_N, L3_N, L3_N, L3_N, L3_N, L3_N, [
            "post-json",
            "write cross",
            {
                handleResource: () => `${appState.server}/api/v2/aicore/cross`,
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
                handleResource: () => `${appState.server}/api/v2/aicore/cross/slaves`,
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
                handleResource: () => `${appState.server}/api/v2/aicore/cross/master`,
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
                handleResource: (item) => `${appState.server}/api/v2/aicore/msp`,
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
    ];

    const L3_7 = [
        L3_N,
        [
            "fetch",
            "member",
            {
                handleResource: (item) => `${appState.server}/api/v2/troom/members`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
            {
                handleResource: (index, item) => `${appState.server}/api/v2/troom/member/${item}/bulletins`,
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
                handleResource: (item) => `${appState.server}/api/v2/troom/members`,
                handleOptions: () => { },
                handleList: (async (res) => {
                    let jsonData = await res.json();
                    return jsonData
                }),
            },
            {
                handleResource: (index, item) => `${appState.server}/api/v2/troom/member/${item}/phones`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ]
    ];

    const L3_8 = [
        L3_N,
        [
            "query",
            "aid",
            {
                handleResource: (item) => `${appState.server}/api/v2/signage/next-view/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ],
        L3_N,
        L3_N,
        [
            "query",
            "aid",
            {
                handleResource: (item) => `${appState.server}/api/v2/signage/views/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ],
        L3_N,
        [
            "query",
            "tag",
            {
                handleResource: (item) => `${appState.server}/api/v2/signage/recomm-views/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ],
        L3_N,
        [
            "query",
            "number of views",
            {
                handleResource: (item) => `${appState.server}/api/v2/signage/last-views/${item}`,
                handleOptions: () => { return {} },
                handleResponse: (async (res) => {
                    let jsonData = await res.json();
                    return JSON.stringify(jsonData, undefined, 4)
                }),
            }
        ],
    ];

    const L4_N = [[null]];

    const L4_1 = [L4_N];
    const L4_2 = [L4_N];
    const L4_3 = [L4_N];
    const L4_4 = [
        L4_N,
        L4_N,
        [
            L3_N,
            L3_N,
            [
                "post-json",
                "write bulletin",
                {
                    handleResource: (item) => `${appState.server}/api/v2/troom/bulletin/${item}`,
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
            L3_N
        ],
        [
            L3_N,
            L3_N,
            L3_N,
            [
                "post-json",
                "write new bulletin",
                {
                    handleResource: (item) => `${appState.server}/api/v2/troom/bulletin/${item}`,
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
    ];

    const L4_5 = [
        L4_N,
        L4_N,
        [
            L3_N,
            L3_N,
            [
                "post-json",
                "call out",
                {
                    handleResource: (item) => `${appState.server}/api/v2/troom/phone/${item}`,
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
    ];

    const L4_6 = [L4_N];
    const L4_7 = [L4_N];
    const L4_8 = [L4_N];

    const L1 = [
        "menu",
        "Topic",
        [
            "Basic",
            "System",
            "Heart",
            "Bulletin",
            "Phone",
            "AICore",
            "Member",
            "Signage"
        ]
    ];
    const L2 = [L2_1, L2_2, L2_3, L2_4, L2_5, L2_6, L2_7, L2_8]
    const L3 = [L3_1, L3_2, L3_3, L3_4, L3_5, L3_6, L3_7, L3_8]
    const L4 = [L4_1, L4_2, L4_3, L4_4, L4_5, L4_6, L4_7, L4_8]

    const TserverTree = [L1, L2, L3, L4]

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
        <Table columnNames={["time", "who", "code", "msg"]} />
        <ResponseArea />
    </StyledLayout>
}

export default TserverLayout;