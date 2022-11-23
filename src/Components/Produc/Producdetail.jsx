import React  from 'react'
import  { useNavigate,useLocation} from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { List } from 'antd'
export default function Producdetail() {
  const path = useLocation()
  console.log(path);
  
 const  navigate= useNavigate()
  const  data = [
        ['商品名称:', `${path.state.Name}`],
        ['商品描述:', `${path.state.deceitor}`],
        ['商品价格:', `${path.state.price}`],
        ['所属分类:', '电脑-笔记本'],
        ['商品图片:', ],

        ['商品详情:', '联想扬天ihfosafnvlsihgasoig']
    ]
    const jumpnav =()=>{
      navigate('/produc')
    }
    
  return (
    <div style={{ marginTop: 20, marginLeft: 20 }}>
        <ArrowLeftOutlined
            style={{ fontSize: 25, diplay: 'block', marginTop: 2,color:'#1890ff' }}
         onClick={jumpnav}
         />
        <p
            style={{
                float: 'right',
                width: 'calc( 100% - 40px)',
                fontSize: 20,
                textAlign: 'left'
            }}
        >
            商品详情
        </p>
        <List
        style={{marginTop:20}}
            size="large"
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </div>
)
}
