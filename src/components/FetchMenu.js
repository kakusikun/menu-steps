import { useContext, useEffect, useState } from "react";
import AppCtx from "../AppContext";
import {
    StyledMenu,
    StyledMenuTitle,
    StyledMenuList,
} from "./styles/StyledMenu.style";

function FetchMenu({ level, depLevel, depValue, menuTitle }) {
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

    const handleMenuSelection = (index) => {
        let selection = appState.menuSelection;
        if (depValue === "") {
            selection[level] = `${index}`;
        } else {
            selection[level] = `${depValue}-${index}`;
        }
        for (let i = level + 1; i < selection.length; i++) {
            selection[i] = "";
        }
        handleAppState({ menuSelection: selection });
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
                console.log('fetch');
                var res = await fetch('https://httpbin.org/anything', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ test: ["item1", "item2"] })
                });
                try {
                    var jsonData = await res.json()
                    setMenuList(jsonData.json.test);
                } catch (err) {
                    console.error(err)
                }
            }
        })()
        handleTitle("Select " + menuTitle);
    }, [appState.menuSelection[depLevel]])

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
                                            handleMenuSelection(index);
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