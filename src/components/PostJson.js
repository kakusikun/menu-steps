import StyledItem from "./styles/StyledItem.style";
import StyledJsonPost from "./styles/StyledPostJson.style";
import { VscCloudUpload, VscClearAll, VscListTree } from "react-icons/vsc";
import { useContext, useRef, useState } from "react";
import AppCtx from "../AppContext";
import { matchDepValue } from "./utils";

function PostJsonArea({ level, depLevel, depValue, index, postTitle, req }) {
    const [btnPushed, setBtnPushed] = useState({ clear: false, send: false, format: false });
    const textElement = useRef();
    const [appState, handleAppState] = useContext(AppCtx);

    const handleVisibility = () => {
        let selection = appState.menuSelection;
        if (depLevel < 0) {
            return true
        } else {
            return matchDepValue(depValue, selection[depLevel])
        }
    }

    const handleMouse = (bType, mType) => {
        return () => {
            let pushed = mType === "down";
            if (bType === "clear") {
                if (pushed) {
                    textElement.current.value = "";
                }
                setBtnPushed({ ...btnPushed, ...{ clear: pushed } });
            } else if (bType === "format") {
                if (pushed) {
                    try {
                        let value = JSON.parse(textElement.current.value.replaceAll("\n", "").replaceAll(" ", ""));
                        textElement.current.value = JSON.stringify(value, undefined, 4);
                        handleAppState({ response: "" });
                    } catch (err) {
                        if (err instanceof SyntaxError){
                            let errMsg = err.message;
                            if (errMsg.includes("position")){
                                let msgPos = errMsg.lastIndexOf("position") + 9;
                                let errPos = Number(errMsg.slice(msgPos , errMsg.length));
                                let msg = textElement.current.value.replaceAll("\n", "").replaceAll(" ", "");
                                errMsg = `JSON parse error at ${msg.slice(errPos-50, errPos+50)}`;
                            } 
                            handleAppState({ response: errMsg });
                        } else {
                            handleAppState({ response: err });
                        }
                    }
                }
                setBtnPushed({ ...btnPushed, ...{ format: pushed } });
            } else {
                if (pushed) {
                    if (req !== null && req !== undefined) {
                        console.log("send");
                        try {
                            let value = JSON.parse(textElement.current.value.replaceAll("\n", "").replaceAll(" ", ""));
                            let selection = appState.menuSelection;
                            let menuValue = appState.menuValue;
                            selection[level] = `${depValue}-${index}`;
                            menuValue[level] = value;
                            handleAppState({ menuValue: menuValue });
                            (async () => {
                                try {
                                    let res = await fetch(
                                        req.handleResource(menuValue[depLevel]),
                                        req.handleOptions(value)
                                    );
                                    let result = await req.handleResponse(res);
                                    handleAppState({ response: result });
                                } catch (err) {
                                    console.error(err)
                                }
                            })()
                        } catch (err) {
                            if (err instanceof SyntaxError){
                                let errMsg = err.message;
                                if (errMsg.includes("position")){
                                    let msgPos = errMsg.lastIndexOf("position") + 9;
                                    let errPos = Number(errMsg.slice(msgPos , errMsg.length));
                                    let msg = textElement.current.value.replaceAll("\n", "").replaceAll(" ", "");
                                    errMsg = `JSON parse error at ${msg.slice(errPos-50, errPos+50)}`;
                                } 
                                handleAppState({ response: errMsg });
                            } else {
                                handleAppState({ response: err });
                            }
                        }
                    }
                }
                setBtnPushed({ ...btnPushed, ...{ send: pushed } });
            }
        }
    }

    const handleClearBtn = () => {
        if (btnPushed.clear) {
            return <StyledItem className="pushed"
                onMouseDown={handleMouse("clear", "down")}
                onTouchStart={handleMouse("clear", "down")}
                onMouseUp={handleMouse("clear", "up")}
                onTouchEnd={handleMouse("clear", "up")}
            >
                <VscClearAll />
            </StyledItem>
        }
        return <StyledItem
            onMouseDown={handleMouse("clear", "down")}
            onTouchStart={handleMouse("clear", "down")}
            onMouseUp={handleMouse("clear", "up")}
            onTouchEnd={handleMouse("clear", "up")}
        >
            <VscClearAll />
        </StyledItem>;
    }

    const handleFormatBtn = () => {
        if (btnPushed.format) {
            return <StyledItem className="pushed"
                onMouseDown={handleMouse("format", "down")}
                onTouchStart={handleMouse("format", "down")}
                onMouseUp={handleMouse("format", "up")}
                onTouchEnd={handleMouse("format", "up")}
            >
                <VscListTree />
            </StyledItem>
        }
        return <StyledItem
            onMouseDown={handleMouse("format", "down")}
            onTouchStart={handleMouse("format", "down")}
            onMouseUp={handleMouse("format", "up")}
            onTouchEnd={handleMouse("format", "up")}
        >
            <VscListTree />
        </StyledItem>;
    }

    const handleSendBtn = () => {
        if (btnPushed.send) {
            return <StyledItem className="pushed"
                onMouseDown={handleMouse("send", "down")}
                onTouchStart={handleMouse("send", "down")}
                onMouseUp={handleMouse("send", "up")}
                onTouchEnd={handleMouse("send", "up")}
            >
                <VscCloudUpload />
            </StyledItem>
        }
        return <StyledItem
            onMouseDown={handleMouse("send", "down")}
            onTouchStart={handleMouse("send", "down")}
            onMouseUp={handleMouse("send", "up")}
            onTouchEnd={handleMouse("send", "up")}
        >
            <VscCloudUpload />
        </StyledItem>
    }

    return <>
        {
            handleVisibility()
                ? <StyledJsonPost>
                    <div className="menu">
                        <div className="title">
                            {postTitle}
                        </div>
                        <div className="selection">
                            {handleFormatBtn()}
                            {handleClearBtn()}
                            {handleSendBtn()}
                        </div>
                    </div>
                    <textarea
                        ref={textElement}>
                    </textarea>
                </StyledJsonPost>
                : <></>
        }
    </>
}

export default PostJsonArea;