import React, { useState, useEffect,useRef } from 'react'
import { useNavigate } from "react-router-dom";
import   TextEditor from "./Editor";
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
    Button,
    Form,
    Input,
    Cascader,
    message,
    Upload,
    InputNumber
} from 'antd'
import { reqCategory } from '../../api/index'
import ImgCrop from 'antd-img-crop'
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
}
/* eslint-enable no-template-curly-in-string */

const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}
export default function Productupdate() {
    const [options, setOptions] = useState([])
    const   myRef = useRef()
    const onFinish = (values) => {
        console.log(values)
        console.log(myRef.current.props.getDetil());
    }
    const navigate =useNavigate()

    useEffect(() => {
        const getCategory = async () => {
            const result = await reqCategory('0')
            const options = result.data.map((item) => {
                return {
                    value: `${item._id}`,
                    label: `${item.name}`,
                    children: [
                        {
                            value: '123',
                            label: '电视'
                        }
                    ]
                }
            })

            setOptions(options)
        }
        getCategory()
    }, [])
const jumpicon = ()=>{
    navigate('/produc')
}
    const [fileList, setFileList] = useState([])
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }
    const onPreview = async (file) => {
        let src = file.url
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj)
                reader.onload = () => resolve(reader.result)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        imgWindow?.document.write(image.outerHTML)
    }
    return (
        <div style={{ marginTop: 20, marginLeft: 20 }}>
            <ArrowLeftOutlined
                style={{
                    fontSize: 25,
                    diplay: 'block',
                    marginTop: 2,
                    color: '#1890ff'
                }}
                onClick={jumpicon}
            />
            <p
                style={{
                    float: 'right',
                    width: 'calc( 100% - 40px)',
                    fontSize: 20,
                    textAlign: 'left'
                }}
            >
                添加商品
            </p>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                style={{ marginTop: 50 }}
                labelCol={{
                    span: 2
                }}
                wrapperCol={{
                    span: 9
                }}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="商品名称"
                    rules={[
                        {
                            required: true,
                            message: '商品名称是必填项'
                        }
                    ]}
                >
                    <Input placeholder="请填写商品名称" />
                </Form.Item>
                <Form.Item
                    name={['user', 'introduction']}
                    label="商品描述"
                    rules={[
                        {
                            required: true,
                            message: '商品描述是必填项'
                        }
                    ]}
                >
                    <Input.TextArea placeholder="请填写商品描述" />
                </Form.Item>
                <Form.Item
                    name={['user', 'price']}
                    label="商品价格"
                    rules={[
                        {
                            required: true,
                            message: '请输入大于0的数字,必填项'
                        }
                    ]}
                >
                    <InputNumber
                        min={1}
                        placeholder="请填写商品价格"
                        suffix="RMB"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'catage']}
                    label="商品分类"
                    rules={[
                        {
                            required: true,
                            message: '商品分类是必填项'
                        }
                    ]}
                >
                    <Cascader options={options} placeholder="请选择分类" />
                </Form.Item>
                <Form.Item name={['user', 'update']} label="商品图片">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </Form.Item>
                <Form.Item name={['user', 'editor']} label="商品详情" labelCol={{
                    span: 2
                }}
                wrapperCol={{
                    span: 20
                }}>
                <TextEditor ref={myRef}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
