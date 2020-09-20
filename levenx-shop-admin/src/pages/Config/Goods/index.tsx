import React, { Component } from 'react';
import { withMenus } from 'src/utils';
import { connect } from 'react-redux';
import * as actions from 'src/store/action/goods';
import { TableHeader } from 'src/components';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Space, Drawer, Form, Input, Popconfirm, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PicturesUpload } from 'src/components';
import { goodsSave, goodsDel } from 'src/services/goods';
import moment from 'moment';


class GoodsConfig extends Component<any, any> {

    public form: any;
    constructor(props: any) {
        super(props);
        this.state = {
            formVisible: false
        }
        this.form = null
    }

    componentDidMount() {
        this.props.goodsList();
    }


    render() {
        const { formVisible, formValue, graph, images } = this.state;
        const { goods } = this.props;
        const { loading, list } = goods;
        const { pn, ps, count, data = [] } = list || {};
        const columns = [
            {
                title: '照片',
                dataIndex: 'graph',
                key: 'graph',
                render: (text: string) => {
                    return (
                        <img style={{ height: '5rem', width: '5rem' }} src={text} alt="" />
                    )
                }
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Banner图',
                dataIndex: 'images',
                key: 'images',
                render: (value: any) => {
                    return (<div>
                        {
                            value && value instanceof Array && value.map((image: any, index: number) => {
                                return <img key={`${image}-${index}`} style={{ height: '2rem', width: '2rem', border: '1px solid gray' }} src={image} alt="" />
                            })
                        }
                    </div>)
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateAt',
                key: 'updateAt',
                render: (text: any) => {
                    return text ? moment(text).format("YYYY-MM-DD hh:mm:ss") : ''
                }
            },
            {
                title: '操作',
                render: (value: any) => {
                    return (<Space>
                        <Button key="edit" type="primary" onClick={() => {
                            this.setState({
                                formVisible: true,
                                formValue: value,
                                graph: value.graph,
                                images: Array.from(new Set(value.images || []))
                            })
                        }}>编辑</Button>
                        <Popconfirm placement="topLeft" title={`确定删除${value.name}吗？`} onConfirm={async () => {
                            let result = await goodsDel(value._id);
                            if (result.code === 0) {
                                this.props.goodsList();
                            }
                        }} okText="删除" cancelText="取消">
                            <Button key="del" type="primary" danger>删除</Button>
                        </Popconfirm>
                    </Space>)
                }
            },
        ];
        return (
            <div style={{ width: 'calc(100vw - 250px)' }}>
                <TableHeader>
                    <Button key="add" type="primary" onClick={() => {
                        this.setState({
                            formVisible: true
                        })
                    }}>新增</Button>
                </TableHeader>
                <Table rowKey="_id" style={{ width: '100%' }} dataSource={data} columns={columns} loading={loading}
                    pagination={{
                        pageSize: ps, defaultCurrent: 1, current: pn + 1, total: count, onChange: (pn, ps) => {
                            const { pn: pageNumber } = list;
                            if (pageNumber !== pn + 1) {
                                this.props.goodsList(pn - 1, ps);
                            }
                        }
                    }} />

                <Drawer
                    title="库存管理"
                    placement="right"
                    closable={true}
                    onClose={() => {
                        this.setState({
                            formVisible: false,
                            formValue: null,
                            graph: null,
                            images: null
                        })
                    }}
                    visible={formVisible}
                    width={500}
                >
                    <Form
                        name="basic"
                        key={formValue}
                        ref={el => this.form = el}
                        initialValues={formValue}
                        onFinish={async (data) => {
                            const { formValue, images, graph } = this.state;
                            const submitForm = Object.assign({}, formValue, { images, graph }, data);
                            debugger
                            let result = await goodsSave(submitForm);
                            if (result.code === 0) {
                                this.setState({ formVisible: false, formValue: null, graph: null, images: null })
                                this.props.goodsList();
                            }
                        }}
                        onFinishFailed={() => { }}
                    >
                        <Form.Item
                            label="货物名称"
                            name="name"
                            rules={[{ required: true, message: '请输入货物名称' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="货物价格"
                            name="price"
                            rules={[{ required: true, message: '请输入价格' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="货物照片"
                        >
                            <Upload
                                action="http://localhost:3000/common/upload"
                                listType="picture-card"
                                showUploadList={false}
                                onChange={(files) => {
                                    for (let { response } of files.fileList) {
                                        if (response) {
                                            this.setState({
                                                graph: response.url
                                            })
                                        }
                                    }
                                }}>
                                {graph ?
                                    <img src={graph} alt="avatar" style={{ width: '100%' }} />
                                    :
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>上传</div>
                                    </div>}

                            </Upload>
                        </Form.Item>

                        <Form.Item label="Banner图">
                            {
                                formVisible && <PicturesUpload
                                    defaultImages={Array.from(new Set(images || []))}
                                    uploadChange={(images: []) => {
                                        this.setState({
                                            images
                                        })
                                    }} />
                            }
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

const mapDispatchToprops = (dispatch: Dispatch) =>
    bindActionCreators(
        actions,
        dispatch
    )

export default connect(state => state, mapDispatchToprops)(withMenus(GoodsConfig));