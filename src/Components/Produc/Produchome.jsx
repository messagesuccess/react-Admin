import React, { useEffect, useState } from 'react'
import  { Link} from 'react-router-dom'
import { Select, Input, Button, Space, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqproduction } from '../../api/index'
const { Search } = Input
export default function Produchome() {

    const [shopping, setShopping] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (value) => {
      
        console.log(`selected ${value}`)
    }
    const onSearch = (value) => console.log(value)
    const { Column, ColumnGroup } = Table

    const data = [
        {
            key: '1',
            Name: '联想THINKPad 伊480',
            deceitor: '年度重量级新品,X390、T390全新登场 ',
            price: '66000',
            tags: ['下架', '在售']
        },
        {
            key: '2',
            Name: '戴尔THINKPad 伊480',
            deceitor: '神舟hasee z5dn5np  游戏本',
            price: '62009',
            tags: ['下架', '在售']
        },
        {
            key: '3',
            Name: 'ipad',
            deceitor: '年度重量级新品,ipad pro2022全新登场  更加轻薄机身设计',
            price: '65245',
            tags: ['下架', '在售']
        },
        {
            key: '4',
            Name: 'ipone112',
            deceitor: '年度重量级新品,ipad pro2022全新登场  更加轻薄机身设计',
            price: '65245',
            tags: ['下架', '在售']
        },
        {
            key: '5',
            Name: 'ipone13',
            deceitor: '年度重量级新品,ipad pro2022全新登场  更加轻薄机身设计',
            price: '65245',
            tags: ['下架', '在售']
        },
        {
            key: '6',
            Name: 'ipone14',
            deceitor: '年度重量级新品,ipad pro2022全新登场  更加轻薄机身设计',
            price: '65245',
            tags: ['下架', '在售']
        }
    ]
    const getproduction = (pageNum, pageSize) => {
       
        reqproduction(pageNum, pageSize).then((res) => {
            if (res.status === 0) {
                message.error('请求正常,但无数据,请添加数据')
                setLoading(false)
                setShopping(res.data.list)
            } else {
                message.error('请求出错了，请刷新重试')
            }
        })
    }
    useEffect(() => {
        getproduction(1, 5)
    }, [])
    return (
        <>
            <Select
                labelInValue
                defaultValue={{
                    value: 'jack',
                    label: '按名称搜索'
                }}
                style={{
                    width: 120,
                    margin: 20
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'jack',
                        label: '按名称搜索'
                    },
                    {
                        value: 'lucy',
                        label: '按描述搜索'
                    }
                ]}
            />
            <Search
                placeholder="请输入搜索内容"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 304,
                    marginTop: 20,
                    marginBottom: 20
                }}
            />
           <Link to={'/produc/productupdate'}>
                <Button style={{ float: 'right', margin: 20 }}>
                    <PlusOutlined />
                    添加商品
                </Button>
           </Link>
            <Table
            loading={loading}
                dataSource={data}
                scroll={{ x: 100, y: 400 }}
                pagination={{ defaultPageSize: 5 }}
                onChange={(page, pageSize) => {
                    getproduction(page, pageSize)
                }}
            >
                <Column
                    title="商品名称"
                    width="150px"
                    dataIndex="Name"
                   
                ></Column>
                <Column
                    title="商品描述"
                    dataIndex="deceitor"
                    key="age"
                    width="500px"
                />
                <Column
                    title="价格"
                    dataIndex="price"
                    key="address"
                    width="100px"
                />
                <Column
                    width="100px"
                    title="状态"
                    dataIndex="tags"
                    key="tags"
                    render={(tags) => (
                        <div>
                            <Button
                                color="blue"
                                key={tags}
                                style={{
                                    backgroundColor: '#1890ff',
                                    color: 'white'
                                }}
                            >
                                下架
                            </Button>
                            <p style={{ textIndent: '17px' }}>在售</p>
                        </div>
                    )}
                />
                <Column
                    width="100px"
                    title="操作"
                    key="action"
                    render={(_, record) => (
                      
                        <Space size="middle">
                            <Link  to={'/produc/Producdetail'} state={{deceitor:record.deceitor,Name:record.Name,price:record.price}}>详情</Link>
                            <a href="javacript">修改</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}
