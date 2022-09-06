import { StyledMenu, StyledMenuItem } from "./styles/StyledMenu.style";

function Menu({ title }) {
    return <StyledMenu>
        <StyledMenuItem>
            <p>{title}</p>
        </StyledMenuItem>
        <StyledMenuItem>
            <p>{title}</p>
            <p>{title}</p>
        </StyledMenuItem>
    </StyledMenu>
}

export default Menu;