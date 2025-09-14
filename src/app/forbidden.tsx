import {Button, Result} from "antd";
import Link from "next/link";

export default function Forbidden() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="抱歉，您无权访问此页面"
            extra={
                <Button type="primary">
                    <Link to="/" href={"/"}>返回首页</Link>
                </Button>
            }
        />
    )
}