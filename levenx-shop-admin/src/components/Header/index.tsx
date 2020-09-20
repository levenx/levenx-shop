import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './index.less';

const { Header } = Layout;

class CustumHeader extends PureComponent {
    render() {
        return (
            <Header className="cunstom-header">
                <h1>
                    芳甸花草香
                </h1>
            </Header>
        );
    }
}

export default CustumHeader;