import React, { Fragment, useState, useEffect, } from 'react'
import { Table } from 'antd'
import { Button, Space, message, Modal, Form, Input } from 'antd'
import './category.scss'
import { reqCategory, reqAddCategory,} from '../../api/index'
import { nanoid } from 'nanoid'
import Updatebutton from './Updatebutton'

export default function Category() {
    
    const [formLayout, setFormLayout] = useState('horizontal');
    const [category, setCategory] = useState()
    const [size, setSize] = useState('large')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
    const onFinish = async (values) => {
     
        //添加数据的方法 
         reqAddCategory(values.name,'0')
        setIsModalOpen(false)
        reqCategory('0').then((res) => {
            if (res.status === 0) {
                const data = res.data.map((item) => {
                    item.key = nanoid()

                    return item
                })

                setCategory(data)
            } else {
                message.error('请求出错了，请刷新重试')
            }
        })
    }
        
    
    const hadlecenter=()=>{
        setIsModalOpen(false)
    }
    
    const [form] = Form.useForm()
    const [requiredMark, setRequiredMarkType] = useState('optional')
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue)
    }

    
    const showSubCategory = async () => {
        //查看子类的方法
        const result = await reqCategory('1')
        if (result.status === 0) {
            const data = result.data.map((item) => {
                item.key = nanoid()
                return item
            })
            message.error('数据异常，没有二级列表数据')
            setCategory(data)
        }
    }

    useEffect(() => {
        reqCategory('0').then((res) => {
            if (res.status === 0) {
                const data = res.data.map((item) => {
                    item.key = nanoid()

                    return item
                })

                setCategory(data)
            } else {
                message.error('请求出错了，请刷新重试')
            }
        })
    }, [])
    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',

            filters: [
                {
                    text: 'Joe',
                    value: 'Joe'
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                    children: [
                        {
                            text: 'Yellow',
                            value: 'Yellow'
                        },
                        {
                            text: 'Pink',
                            value: 'Pink'
                        }
                    ]
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green'
                        },
                        {
                            text: 'Black',
                            value: 'Black'
                        }
                    ]
                }
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: '70%'
        },
        {
            title: '操作',
            dataIndex: 'address',
            render: (_, record) => (
                <Space size="middle">
                    <Updatebutton record={record} />
                    <Button type="link" size={size} onClick={showSubCategory}>
                        查看子类
                    </Button>
                </Space>
            ),
            filters: [
                {
                    text: 'London',
                    value: 'London'
                },
                {
                    text: 'New York',
                    value: 'New York'
                }
            ],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '30%'
        }
    ]
    
    const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 5,
            offset: 15,
          },
        }
      : null;
    return (
        <Fragment>
            <div className="category-top">
                <p>一级分类列表</p>
                <Space wrap className="category-top-button">
                    <Button type="primary" onClick={showModal}>
                        添加
                    </Button>
                    <Modal
                    closable={false}
                        footer={null}
                        title="添加分类"
                        open={isModalOpen}
                        keyboard={true}
                       
                       
                    >
                        <Form
                           onFinish={onFinish}
                           name="basic"
                            form={form}
                            layout="vertical"
                            initialValues={{
                                requiredMarkValue: requiredMark
                            }}
                            onValuesChange={onRequiredTypeChange}
                            requiredMark={requiredMark}
                        >
                            <Form.Item
                            name="sumbit"
                            initialValue='一级分类表'
                                label="所属分类"
                                required
                                tooltip="这是一个必填项"
                            >
                                <select
                                
                              
                                    id=""
                                    style={{
                                        width: '472px',
                                        height: '32px',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="一级分类表">一级分类表</option>
                                    <option value="玩具">玩具</option>
                                    <option value="大衣">大衣</option>
                                    <option value="牛仔裤">牛仔裤</option>
                                    <option value="羽绒服">羽绒服</option>
                                    <option value="电脑">电脑</option>
                                </select>
                                
                            </Form.Item>
                            <Form.Item
                            name="name"
                                label="分类名称"
                                required
                                tooltip="这是一个必填项"
                            >
                                <Input placeholder="请输入分类名称" />
                            </Form.Item>
                            <Form.Item {...buttonItemLayout}>
                                <Button type="primary"  htmlType="submit">确定</Button>
                            </Form.Item>
                           
                            <Button type="primary" className='button' onClick={hadlecenter}>取消</Button>
                          
                        </Form>
                    </Modal>
                </Space>
            </div>
            <div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={category}
                    loading={category ? false : true}
                    scroll={{ x: 100, y: 400 }}
                />
            </div>
        </Fragment>
    )
}
