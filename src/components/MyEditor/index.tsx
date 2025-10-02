import React from "react";
import {Editor} from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
// 样式不要忘了
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.css';
import './index.css';

interface Props {
    value?: string
    placeholder?: string
    onChange: (value) => void

}

/**
 * 自定义markdown编辑器
 * @param props
 * @constructor
 */
const MyEditor: React.FC = (props: Props) => {
    const plugins = [gfm(), highlight()];
    const { value = "", placeholder, onChange } = props;
    return (
        <div className={"my-editor"}>
            <Editor
                plugins={plugins}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                mode={"split"}
            >
            </Editor>
        </div>
    )
}

export default MyEditor;