import { useState } from "react";
import {
    StyledMenu,
    StyledMenuTitle,
    StyledMenuList,
} from "./styles/StyledMenu.style";

function Menu({ menuTitle, menuList }) {
    const [title, setTitle] = useState("Select " + menuTitle);
    const [opened, setOpened] = useState(false);

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

    return <StyledMenu
        tabIndex={1}
        onClick={handleOpened}
        onBlur={handleClosed}>
        <StyledMenuTitle>
            <p>{title}</p>
        </StyledMenuTitle>
        {
            opened ?
                <StyledMenuList>
                    {menuList.map((item, index) => (
                        <div
                            className="select"
                            onClick={() => {
                                handleTitle(item);
                                handleOpened();
                            }}>
                            {item}
                        </div>
                    ))}
                </StyledMenuList>
                : <></>
        }
    </StyledMenu>
}

export default Menu;