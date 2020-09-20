import React, { Component } from 'react';
import { withMenus } from 'src/utils';
import * as actions from 'src/store/action/home';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, Table, Button } from 'antd';
import moment from 'moment';
import './index.less';

class Home extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.homeInit();
    }

    render() {
        const { home } = this.props;
        const { overview, newOrders } = home;
        const columns = [
            {
                title: '订单号',
                render: (value: any) => {
                    return <div>{value._id}</div>
                }
            },
            {
                title: "地址",
                dataIndex: "address",
                key: 'address',
                render: (value: any = {}) => {
                    return <div>{value.userName}({value.telNumber})</div>
                }
            },
            {
                title: "订单详情",
                dataIndex: "detail",
                key: 'detail',
                render: (value: any) => {
                    return (
                        <div>
                            {
                                value && value.map((it: any) => {
                                    return <img key={it._id} style={{ height: '2rem', width: '2rem' }} title={it.name} src={it.graph} alt="" />
                                })
                            }
                        </div>)
                }
            },
            {
                title: "订单状态",
                render: (value: any) => {
                    return <div>待收货</div>
                }
            },
            {
                title: "总金额",
                dataIndex: 'totalPrice',
                key: "totalPrice",
                render: (value: any) => {
                    return <div>{value}</div>
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateAt',
                key: 'updateAt',
                render: (text: any) => {
                    return text ? moment(text).format("MM-DD hh:mm:ss") : ''
                }
            },
            {
                title: '操作',
                render: (value: any) => {
                    return (<Button key="del" type="primary" onClick={() => {
                        this.props.history.push("/order/config")
                    }}>订单详情</Button>)
                }
            }
        ];
        return (
            <div className="home-container">
                {/* 顶部item */}
                <div className="home-item-container">
                    <div className="home-item">
                        <div className="home-item-title">待处理</div>
                        <div className="home-item-number">{overview.Order}</div>
                    </div>
                    <div className="home-item">
                        <div className="home-item-title">货品总数</div>
                        <div className="home-item-number">{overview.Goods}</div>
                    </div>
                    <div className="home-item">
                        <div className="home-item-title">类型总数</div>
                        <div className="home-item-number">{overview.Classify}</div>
                    </div>
                    <div className="home-item">
                        <div className="home-item-title">总订单</div>
                        <div className="home-item-number">{overview.AllOrder}</div>
                    </div>
                </div>
                <Card title="最新订单" style={{ marginTop: '2rem' }}>
                    <Table rowKey="_id" style={{ width: '100%' }} dataSource={Object.values(newOrders) as any} columns={columns} pagination={false} />
                </Card>

            </div>
        );
    }
}

const mapDispatchToprops = (dispatch: Dispatch) =>
    bindActionCreators(
        actions,
        dispatch
    )
export default connect(state => state, mapDispatchToprops)(withMenus(Home));