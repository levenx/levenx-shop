import React, { Component } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesUpload extends Component {

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.defaultImages && !nextState.default) {
            let fileList = [];
            for (let image of nextProps.defaultImages) {
                if (image && typeof image === 'string') {
                    debugger
                    let uid = image.split("://")[1];
                    fileList.push({
                        key: uid,
                        uid: uid,
                        name: uid,
                        status: 'done',
                        url: image,
                    })
                }
            }
            return {
                fileList,
                default: true
            }
        }
        return null;
    }

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };


    handleCancel = () => {
        this.setState({ previewVisible: false })
    };

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => {
        const images = this.props.defaultImages || [];
        for (let { response } of fileList) {
            if (response) {
                images.push(response.url)
            }
        }
        this.props.uploadChange(Array.from(new Set(images)));
        this.setState({ fileList })
    };

    onRemove = (file) => {
        let defaultImages = this.props.defaultImages;
        let fileList = [];
        for (let image of defaultImages) {
            let uid = image.split("://")[1];
            fileList.push({
                key: uid,
                uid: uid,
                name: uid,
                status: 'done',
                url: image,
            })
        }
        debugger
        fileList = fileList.filter((item) => { return item.uid !== file.uid });
        let images = [];
        for (let { url } of fileList) {
            images.push(url)
        }
        this.props.uploadChange(images);
        return true;
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="http://localhost:3000/common/upload"
                    listType="picture-card"
                    fileList={fileList}
                    defaultFileList={this.props.defaultImages}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.onRemove}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default PicturesUpload;