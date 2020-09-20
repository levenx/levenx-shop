
import {
    AppstoreOutlined,
    DesktopOutlined,
    ContainerOutlined,
    PartitionOutlined,
    DatabaseOutlined
} from '@ant-design/icons';

export const menus = [
    {
        icon: AppstoreOutlined,
        title: '主页',
        href: "/"
    },
    {
        icon: ContainerOutlined,
        title: '订单管理',
        href: "/order/config"
    },
    {
        icon: DatabaseOutlined,
        title: '库存管理',
        href: "/goods/config"
    },
    {
        icon: PartitionOutlined,
        title: '类型管理',
        href: "/classify/config"
    },
    {
        icon: DesktopOutlined,
        title: '内容管理',
        href: "/content/config"
    },
    {
        icon: ContainerOutlined,
        title: '系统设置',
        href: "/setting"
    }
]