import { useContext, useEffect, useState } from "react";
import AppCtx from "../AppContext";
import {
    StyledMenu,
    StyledMenuTitle,
    StyledMenuList,
} from "./styles/StyledMenu.style";

function FetchMenu({ level, depLevel, depValue, menuTitle, listReq, req }) {
    const [title, setTitle] = useState("Select " + menuTitle);
    const [menuList, setMenuList] = useState([]);
    const [opened, setOpened] = useState(false);
    const [appState, handleAppState] = useContext(AppCtx);

    const handleVisibility = () => {
        let selection = appState.menuSelection;
        if (depLevel < 0) {
            return true
        } else {
            return selection[depLevel] === depValue
        }
    }

    const handleMenuState = (index, item) => {
        let selection = appState.menuSelection;
        let menuValue = appState.menuValue;
        if (depValue === "") {
            selection[level] = `${index}`;
        } else {
            selection[level] = `${depValue}-${index}`;
        }
        for (let i = level + 1; i < selection.length; i++) {
            selection[i] = "";
            menuValue[i] = "";
        }
        menuValue[level] = item;
        handleAppState({ menuSelection: selection, menuValue: menuValue });
    };

    const handleTitle = (title) => {
        setTitle(title);
    };

    const handleOpened = () => {
        if (opened) {
            setOpened(false);
        } else {
            setOpened(true);
        }
    };

    const handleClosed = () => setOpened(false);

    useEffect(() => {
        (async () => {
            if (handleVisibility()) {
                console.log('fetch list');
                try {
                    let menuValue = appState.menuValue;
                    let res = await fetch(
                        listReq.handleResource(menuValue[depLevel]),
                        listReq.handleOptions(menuValue[depLevel])
                    );
                    let list = await listReq.handleList(res);
                    if (Array.isArray(list)) {
                        setMenuList(list);
                    } else {
                        console.error('fetch menu only accept array');
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        })()
        handleTitle("Select " + menuTitle);
    }, [appState.menuSelection[depLevel]])

    const handleResponse = (item) => {
        (async () => {
            if (req !== null && req !== undefined) {
                console.log('fetch');
                try {
                    let res = await fetch(
                        req.handleResource(item),
                        req.handleOptions(item)
                    );
                    let result = await req.handleResponse(res);
                    handleAppState({ response: result });
                } catch (err) {
                    console.error(err)
                }
            }
        })()
    }

    return <>
        {
            handleVisibility()
                ? <StyledMenu
                    tabIndex={1}
                    onClick={handleOpened}
                    onBlur={handleClosed}>
                    <StyledMenuTitle>
                        <p>{title}</p>
                    </StyledMenuTitle>
                    {
                        opened
                            ? <StyledMenuList>
                                {menuList.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select"
                                        onClick={() => {
                                            handleTitle(item);
                                            handleOpened();
                                            handleMenuState(index, item);
                                            handleResponse(item);
                                        }}>
                                        {item}
                                    </div>
                                ))}
                            </StyledMenuList>
                            : <></>
                    }
                </StyledMenu>
                : <></>
        }
    </>
}

export default FetchMenu;