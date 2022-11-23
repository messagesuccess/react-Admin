import { Button, Modal,message } from 'antd';
import React, { useState ,useRef} from 'react';
import {reqUpdateCategory } from '../../api/index'
export default function Updatebutton(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [size, setSize] = useState('large')
    const ref = useRef()
    const showModal = () => {
        setIsModalOpen(true);
      };
const handleOk = () => {
    
    setIsModalOpen(false)
    
    if(ref.current.value !==props.record.name){
     
        reqUpdateCategory(ref.current.value,props.record._id).then((res)=>{
            
        message.error('请求正常，但返回无数据')
        })
    }
    ref.current.value=''
}

const handleCancel = () => {
    setIsModalOpen(false)
    ref.current.value=''
}

  return (
    <>
                    <Button type="link" size={size} onClick={showModal}>
                            修改分类
                        </Button>
                        <Modal
                            title="修改分类"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          
                        >
                            <input ref={ref} type="text"  style={{width:472,outline:'none',fontSize:20}} placeholder={props.record.name}/>
                        </Modal>
                    </>
  )
}
