import { useContext, useEffect, useState } from "react";
import AppCtx from "../AppContext";
import {
    StyledMenu,
    StyledMenuTitle,
    StyledMenuList,
} from "./styles/StyledMenu.style";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

function Menu({ level, depLevel, depValue, menuTitle, menuList }) {
    const [title, setTitle] = useState("Select " + menuTitle);
    const [opened, setOpened] = useState(false);
    const [appState, handleAppState] = useContext(AppCtx);

    const handleVisibility = () => {
        let selection = appState.menuSelection;
        if (depLevel < 0) {
            return true
        } else {
            if (depValue === "*") {
                return selection[depLevel] !== ""
            }
            return selection[depLevel] === depValue
        }
    }

    const handleMenuState = (index, item) => {
        let menuValue = appState.menuValue;
        let selection = appState.menuSelection;
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

    const handleHintIcon = (opened) => {
        if (opened) {
            return <VscChevronDown className="opened-hint" />
        } else {
            let selection = appState.menuSelection[level];
            if (selection !== undefined && selection !== "") {
                return <VscChevronUp className="closed-hint" />
            }
            return <VscChevronUp className="hint" />
        }
    }

    useEffect(() => {
        handleTitle("Select " + menuTitle);
    }, [appState.menuSelection[depLevel]])

    return <>
        {
            handleVisibility()
                ? <StyledMenu
                    tabIndex={1}
                    onClick={handleOpened}
                    onBlur={handleClosed}>
                    <StyledMenuTitle opened={opened}>
                        <p>{title}</p>
                        {handleHintIcon(opened)}
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

export default Menu;