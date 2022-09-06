import { StyledLayout } from "./styles/StyledLayout.style"
import Menu from "./Menu";
import { Address } from "./Address";

function Layout() {
    return <StyledLayout>
        <Address />
        <Menu menuTitle="Topic" menuList={["bulletin", "phone"]} />
    </StyledLayout>
}

export default Layout;