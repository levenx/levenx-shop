import React from 'react';
import { Layout } from 'antd';
import { Menus } from 'src/components';


export const withMenus = (WrappedComponent) => {
    return class extends React.Component {

        componentDidMount() {
            // this.resize = window.addEventListener("resize", this.windowResize)
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.resize)
        }

        windowResize = (event) => {

        }


        render() {
            // 将 input 组件包装在容器中，而不对其进行修改。Good!
            return <Layout className="menus-container" style={{ height: 'calc(100vh - 64px)' }}>
                <Menus />
                <div style={{ padding: '1rem', width: '100%' }}>
                    <WrappedComponent {...this.props} />
                </div>
            </Layout>;
        }
    }
}