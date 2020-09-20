import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import moment from 'moment';
import './index.less';


function _uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

export const wsBaseUrl = `ws://localhost:8800`

class Login extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            uid: _uuid()
        }
    }

    componentDidMount() {
        let { uid } = this.state;
        console.log("uid:", uid)
        let wsUrl = `${wsBaseUrl}/login/scan?uid=${uid}`
        const rws = new ReconnectingWebSocket(wsUrl);

        rws.addEventListener("message", (message) => {
            let { data } = message;
            data = JSON.parse(data);
            switch (data.operate) {
                case "scan":
                    const { nickName, avatarUrl } = data;
                    this.setState({ scan: true, text: "扫码成功", nickName, avatarUrl });
                    break;
                case "done":
                    debugger
                    this.setState({ done: true, text: "授权成功" }, () => {
                        setTimeout(() => {
                            localStorage.setItem("TOKEN", data.token);
                            localStorage.setItem("LOGIN_TIME", moment().format("YYYY-MM-DD hh:mm:ss"));
                            rws.close();
                            window.location.href = "/";
                        }, 1000);
                    });
                    break;
            }
            console.log(data)
        })
    }

    render() {
        const { scan, done, text, uid, nickName, avatarUrl } = this.state;
        return (
            <div className="login-container">
                <div className="login-banner">  </div>
                <div className="login-qr">
                    <div style={{ position: 'relative', height: '23rem' }}>
                        <img src={`https://blog.levenx.com/levenx-shop/login/qr?uid=${uid}`} alt=""></img>
                        {
                            (scan || done) && <div style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                zIndex: 2,
                                top: 0,
                                textAlign: 'center',
                                // filter: 'blur(4px)',
                                background: 'rgba(190, 190, 190 ,0.9)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src={avatarUrl} alt="" />
                                <div style={{ color: '#fff', marginTop: '1rem' }}>{nickName}</div>
                                <h2 style={{ color: '#fff' }}>{text}</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;