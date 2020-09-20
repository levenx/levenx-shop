import React, { Component } from 'react';
import './index.less';

class TableHeader extends Component<any, any> {
    render() {
        return (
            <div className="table-header">
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default TableHeader;