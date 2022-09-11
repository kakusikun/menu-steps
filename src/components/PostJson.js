import StyledItem from "./styles/StyledItem.style";
import StyledJsonPost from "./styles/StyledPostJson.style";
import StyledPushItem from "./styles/StyledPushedItem.style";
import { VscCloudUpload, VscClose } from "react-icons/vsc";

function PostJsonArea() {
    return <StyledJsonPost>
        <div className="menu">
            <div className="title">
                JSON
            </div>
            <div className="selection">
                <StyledItem>
                    <VscClose />
                </StyledItem>
                <StyledItem>
                    <VscCloudUpload />
                </StyledItem>
            </div>
        </div>
        <textarea
            placeholder="press 'enter' to confirm">
        </textarea>
    </StyledJsonPost>
}

export default PostJsonArea;