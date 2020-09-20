import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { menus } from 'src/config/menus';

const { Sider } = Layout;

class Menus extends PureComponent {
    render() {
        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[window.location.pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            menus.map((menu) => {
                                return (
                                    <Menu.Item key={menu.href} icon={<menu.icon />}>
                                        <Link to={menu.href}>{menu.title}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default Menus;