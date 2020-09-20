import React, { Component } from 'react';
import { Table, Transfer, Modal, Spin, Button, Form, Input, Space, Popconfirm } from 'antd';
import { withMenus } from 'src/utils';
import { TableHeader } from 'src/components';
import { connect } from 'react-redux';
import * as actions from 'src/store/action/classify';
import { goodsAll } from 'src/store/action/goods';
import { bindActionCreators, Dispatch } from 'redux';
import { classifyGoodsRelation, classifyGoodsAdd, classifyAdd, classifyDel } from 'src/services/classify';


class ClassifyConfig extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            transferVisible: false,
            formVisible: false,
            expandedRows: [],
            targetKeys: []
        }
    }

    async componentDidMount() {
        this.props.classifyList();
        this.props.goodsAll();
    }


    render() {
        const { classify, goods } = this.props;
        const { goodsAll } = goods || {};
        const { loading, list } = classify || {};
        const { pn, ps, count, data } = list || {};
        const { transferVisible, selectedKeys, targetKeys, formVisible, currentRecord } = this.state;
        const columns = [
            { title: 'ID', dataIndex: '_id', key: '_id' },
            { title: '类型', dataIndex: 'classify', key: 'classify' },
            { title: '排序权重', dataIndex: 'weight', key: 'weight' },
            { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
            { title: '更新时间', dataIndex: 'updateAt', key: 'updateAt' },
            {
                title: '操作',
                key: 'operation',
                render: (value: any) => <Space>
                    <Button type="primary" onClick={() => {
                        this.setState({ formVisible: true, currentRecord: value })
                    }}>编辑</Button>
                    <Button type="dashed" onClick={async () => {
                        let { code, data } = await classifyGoodsRelation(value._id);
                        if (code === 0) {
                            let targetKeys = [];
                            for (let { _id } of data) {
                                targetKeys.push(_id);
                            }
                            this.setState({ transferVisible: true, currentRecord: value, targetKeys })
                        }
                    }}>关联</Button>
                    <Popconfirm placement="topLeft" title={`确定删除${value.classify}吗？`} onConfirm={async () => {
                        let result = await classifyDel(value._id);
                        if (result.code === 0) {
                            this.props.classifyList();
                        }
                    }} okText="删除" cancelText="取消">
                        <Button key="del" type="primary" danger>删除</Button>
                    </Popconfirm>
                </Space>
            }
        ];
        return (
            <div>
                <TableHeader>
                    <Button key="add" type="primary" onClick={() => {
                        this.setState({
                            formVisible: true
                        })
                    }}>新增</Button>
                </TableHeader>
                <Table
                    rowKey="_id"
                    loading={loading}
                    className="components-table-demo-nested"
                    columns={columns}
                    expandable={{
                        onExpand: async (expanded, record) => {
                            const { expands = [] } = this.state;
                            if (expanded) {
                                let { code, data } = await classifyGoodsRelation(record._id);
                                if (code === 0 && data && !!data.length) {
                                    expands[record._id] = data;
                                }
                                this.setState({
                                    expands
                                })
                            }
                        },
                        expandedRowRender: (record, index, indent, expanded) => {
                            const { expands } = this.state;
                            if (expanded) {
                                if (expands) {
                                    return (<div>
                                        {
                                            expands[record._id] ? expands[record._id].map((item: any) => {
                                                return <div><img style={{ height: '2rem', width: '2rem' }} src={item.graph} alt="" /> <text>{item.name}</text></div>
                                            }) : <div>暂无数据</div>
                                        }
                                    </div>)
                                } else {
                                    return <Spin />;
                                }
                            }
                        }
                    }}
                    dataSource={data}
                    pagination={{
                        pageSize: ps, defaultCurrent: 1, current: pn + 1, total: count, onChange: (pn, ps) => {
                            const { pn: pageNumber } = list;
                            if (pageNumber !== pn + 1) {
                                this.props.classifyList(pn - 1, ps);
                            }
                        }
                    }}
                />

                <Modal
                    title="类型管理"
                    footer={null}
                    visible={formVisible}
                    onCancel={() => {
                        this.setState({ formVisible: false, currentRecord: null })
                    }}
                >
                    <Form
                        name="basic"
                        key={currentRecord}
                        initialValues={currentRecord}
                        onFinish={async (value) => {
                            const { currentRecord } = this.state;
                            debugger
                            let classify = Object.assign({}, currentRecord, value);
                            let { code } = await classifyAdd(classify);
                            if (code === 0) {
                                this.props.classifyList();
                                this.setState({
                                    formVisible: false,
                                    currentRecord: null
                                })
                            }
                        }}
                        onFinishFailed={() => { }}
                    >
                        <Form.Item
                            label="类型"
                            name="classify"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="排序权重"
                            name="weight"
                            rules={[{ required: true, message: '请选择排序权重' }]}
                        >
                            <Input type="number" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>

                </Modal>

                <Modal
                    title="类型关联"
                    visible={transferVisible}
                    onOk={async () => {
                        const { currentRecord, targetKeys } = this.state;
                        let { code } = await classifyGoodsAdd({ classifyId: currentRecord._id, goodsIds: targetKeys });
                        if (code === 0) {
                            this.setState({ transferVisible: false });
                            this.props.classifyList();
                        }
                    }}
                    onCancel={() => {
                        this.setState({
                            transferVisible: false
                        })
                    }}
                >
                    <Transfer
                        dataSource={goodsAll}
                        locale={{ itemUnit: '项', itemsUnit: '项' }}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={(targetKeys, direction, moveKeys) => {
                            this.setState({
                                targetKeys: targetKeys
                            })
                        }}
                        onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                            this.setState({ selectedKeys: sourceSelectedKeys.concat(targetSelectedKeys) })
                        }}
                        render={(item: any) => { return <div key={item._ids}><img style={{ height: '1rem', width: '1rem' }} src={item.graph} alt="" /><text>{item.name}</text></div> }}
                        style={{ marginBottom: 16 }}
                    />
                </Modal>
            </div>
        );
    }
}

const mapDispatchToprops = (dispatch: Dispatch) =>
    bindActionCreators(
        { ...actions, goodsAll },
        dispatch
    )

export default connect(state => state, mapDispatchToprops)(withMenus(ClassifyConfig));