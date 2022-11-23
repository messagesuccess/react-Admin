import React, { useState } from 'react'
import { Divider, Radio, Table } from 'antd'
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>
    },
    {
        title: '创建时间',
        dataIndex: 'age'
    },
    {
        title: '授权时间',
        dataIndex: 'address'
    },
    {
      title: '授权人',
      dataIndex: 'dgsgs'
  }
]
const data = [
    {
        key: '1',
        name: '测试',
        age: '2022-7-7 14:23:53',
        address: '2022-7-7 14:23:53',
        dgsgs: 'admin'
    },
    {
        key: '2',
        name: '经理',
        age: '2022-7-7 14:23:53',
        address: '2022-7-7 14:23:53',
        dgsgs: 'admin'
    },
    {
        key: '3',
        name: '助手',
        age: '2022-7-7 14:23:53',
        address: '2022-7-7 14:23:53',
        dgsgs: 'admin'
    },
    {
        key: '4',
        name: '主管',
        age: '2022-7-7 14:23:53',
        address: '2022-7-7 14:23:53',
        dgsgs: 'admin'
    }
]

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
   
}
export default function Role() {
    const [selectionType, setSelectionType] = useState('radio')
    return (
        <div>
            <div>
                <Radio.Group value={selectionType}></Radio.Group>

                <Divider />

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    )
}
