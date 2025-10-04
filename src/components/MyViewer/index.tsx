import React from "react";
import {Editor, Viewer} from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
// 样式不要忘了
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.css';
import './index.css';

interface Props {
    value?: string
}

/**
 * 自定义markdown阅览器
 * @param props
 * @constructor
 */
const MyViewer: React.FC = (props: Props) => {
    const plugins = [gfm(), highlight()];
    const { value = "" } = props;
    return (
        <div className={"my-viewer"}>
            <Viewer
                plugins={plugins}
                value={value}
            >
            </Viewer>
        </div>
    )
}

export default MyViewer;