/**
 * Created by shenqiao on 2017/12/23.
 */

<<<<<<< HEAD
import {Table,Button} from 'antd'
=======
import {Table,Modal,Button,Input,Alert} from 'antd'
>>>>>>> 151b9588ee69540f735fb1111d9b4365b52f5ce9
import React, {Component} from 'react'
import {ChannelHandler} from '../../HttpRequest/ChannelHandler'
export  default class ChannelViewController extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            visible:false,
            dataSource:[
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    channelName: '西湖区湖底公园1号'
                }
            ],
            columns:[
                {
                    title: '渠道名称',
                    dataIndex: 'channelName',
                    key: 'name',
                },

            ],
            isCanSubmit:false,
        }
    }
    render()
    {
<<<<<<< HEAD
        return ( 
            <div style={{margin:10}}>
                <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>渠道名称</h3>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
                </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
    )
=======
        return (
        <div style={{margin:10}}>
            <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                <h3>渠道列表</h3>
                <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
            </div>
            <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
            {this.model()}
        </div>
        )
>>>>>>> 151b9588ee69540f735fb1111d9b4365b52f5ce9
    }
    componentDidMount()
    {
        this.loadData();
    }
    loadData()
    {
        ChannelHandler.getAllChannel((data)=>{
            this.setState({
                dataSource:data
            })
        },(faile)=>{

        })
    }
    model()
    {
        return (
            <div>
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={()=>this.setState({visible:false})}
                    onCancel={()=>this.setState({visible:false})}
                >
                    <h5>渠道名称</h5>
                    <Input placeholder="渠道名称" />
                    {
                        !this.state.isCanSubmit&&<Alert
                            message="提示"
                            description="带'※'为必填项"
                            type="warning"
                        />
                    }
                </Modal>
            </div>
        )
    }
}
