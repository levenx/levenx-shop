import React, { Component } from 'react';
import { withMenus } from 'src/utils';
import { Table, Button, Space, Popconfirm } from 'antd';
import * as actions from 'src/store/action/order';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { orderDel } from 'src/services/order';
import { SoundTwoTone } from '@ant-design/icons'

class OrderConfig extends Component<any, any> {
    public newOrder: number;
    constructor(props: any) {
        super(props);
        this.state = {

        };
        this.newOrder = 0
    }

    componentDidMount() {
        this.props.orderList();
    }

    componentWillReceiveProps(nextProps: any, nextState: any) {
        if (Object.keys(nextProps.home.newOrders).length !== this.newOrder) {
            this.props.orderList();
            this.newOrder = Object.keys(nextProps.home.newOrders).length
        }
    }


    render() {
        const { order, home } = this.props;
        const { loading, list } = order;
        const { count, pn, ps, data } = list || {};
        const columns = [
            {
                title: '照片',
                render: (value: any) => {
                    return (Object.values(home.newOrders) || []).findIndex((it: any) => it._id === value._id) !== -1 ? <div><SoundTwoTone style={{ fontSize: 20 }} /></div> : null;
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
                    const { pay, send } = value;
                    if (pay) {
                        if (send) {
                            return <div>已完成</div>
                        } else {
                            return <div>待收货</div>
                        }
                    } else {
                        return <div>未付款</div>
                    }
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
                    return (<Space>
                        <Popconfirm placement="topLeft" title={`确定删除吗？`} onConfirm={async () => {
                            let { code } = await orderDel(value._id);
                            if (code === 0) {
                                if (data.length === 1) {
                                    this.props.orderList(pn - 1, ps);
                                } else {
                                    this.props.orderList(pn, ps);
                                }
                            }
                        }} okText="删除" cancelText="取消">
                            <Button key="del" type="primary" danger>删除</Button>
                        </Popconfirm>
                    </Space>)
                }
            }
        ];

        return (
            <div>
                <Table rowKey="_id" style={{ width: '100%' }} dataSource={data} columns={columns} loading={loading}
                    pagination={{
                        pageSize: ps, defaultCurrent: 1, current: pn + 1, total: count, onChange: (pn, ps) => {
                            const { pn: pageNumber } = list;
                            if (pageNumber !== pn + 1) {
                                this.props.orderList(pn - 1, ps);
                            }
                        },
                        showTotal: (total, range) => {
                            return total
                        }
                    }} />
            </div>
        );
    }
}

const mapDispatchToprops = (dispatch: Dispatch) =>
    bindActionCreators(
        actions,
        dispatch
    )

export default connect(state => state, mapDispatchToprops)(withMenus(OrderConfig));