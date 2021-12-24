import React, { useRef } from "react";
import { useViewManage } from "../hooks/viewManage";

export const TextBox = ({ inputRef }) => {
    return (
        <textarea autoFocus ref={inputRef} />
    )
}
export default TextBox;