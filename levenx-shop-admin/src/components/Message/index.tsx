import React, { Component } from 'react';
import { Card } from 'antd';
import Classnames from "classnames";
import * as actions from 'src/store/action/home';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { wsBaseUrl } from 'src/pages/Login'

import './index.less';

class Message extends Component<any, any> {
    public musicRet: any;

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            order: []
        }
    }

    componentDidMount() {
        this.initOrderListen();
    }

    initOrderListen = () => {
        let wsUrl = `${wsBaseUrl}/order`
        const rws = new ReconnectingWebSocket(wsUrl);

        rws.addEventListener("message", (message) => {
            let { data } = message;
            data = JSON.parse(data);
            this.props.newOrders(data);
            this.setState({
                order: data.detail,
                show: true
            })

        })
    }

    componentWillReceiveProps(nextProps: any, nextState: any) {
        if (nextState.show) {
            const playPromise = this.musicRet.play();
            playPromise
                .then((data: any) => {
                    console.log("audio played auto");
                })
                .catch((error: any) => {
                    console.log("playback prevented");
                });
        }
    }

    // static getDerivedStateFromProps(nextProps: any, nextState: any) {

    // }

    render() {
        const { show, order } = this.state;
        return (
            <>
                <div>
                    {this.props.children}
                </div>
                <div className={Classnames("message-container", { "message-show": show })}>
                    <Card title="新订单！！" onClick={() => {
                        this.props.history.push("/order/config");
                        this.setState({ show: false });
                    }} bordered={false} style={{ width: 300 }} extra={<CloseOutlined onClick={() => { this.setState({ show: false }) }} />}>
                        {
                            order && order.map((it: any) => {
                                return <div key={it._id} style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                                    <img src={it.graph} alt="" style={{ width: '3rem', height: '3rem' }} />
                                    <h3>{it.name}</h3>
                                </div>
                            })
                        }
                    </Card>
                    <audio ref={el => this.musicRet = el} style={{ display: `none` }} src="http://custom.static.levenx.com/order.mp3" ></audio>
                </div>
            </>
        );
    }
}

const mapDispatchToprops = (dispatch: Dispatch) =>
    bindActionCreators(
        actions,
        dispatch
    )
export default connect(state => state, mapDispatchToprops)(withRouter(Message));