/**
 * 根据path查找菜单方法
 * @author ricejson
 */
import {MenuItem} from "@/layouts/BasicLayout/_defaultProps";

export default function findMenuItemByPath(path: string, menus: MenuItem[]): MenuItem | undefined  {
    if (menus.length <= 0) {
        return undefined;
    }
    for (let item: MenuItem of menus) {
        // TODO: 暂时解决动态匹配子路由的问题
        if (path.startsWith(item.path)) {
            // 找到了
            return item;
        }
        // 递归查找
        if (item.routes) {
            // 递归查找
            const result = findMenuItemByPath(path, item.routes);
            if (result) {
                return result;
            }
        }
    }
    // 没找到
    return undefined;
}