/**
 * Created by shenqiao on 2017/12/23.
 */

import {Table,Button,Modal,Input,Select,Alert,message} from 'antd'
import React, {Component} from 'react'
import {CustomerHandler} from '../../HttpRequest/CustomerHandler'
import {checkPhone,valiedString} from '../../utils'

export  default class CustomerViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            channel:null,
            staff:null,
            segment:null,
            visible:false,
            modifyStatus:false,
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '接待人',
                dataIndex: 'staff',
                key: 'staff',
            },{
                title: '来源渠道',
                dataIndex: 'channel',
                key: 'channel',
            },{
                title: '来访时间',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: '来访目的',
                dataIndex: 'intention',
                intention: 'intention',
                render: (x,y,z)=>x?x:'-',
            },{
                title: '成交状态',
                dataIndex: 'status',
                key: 'status',
                render: (x,y,z)=>{
                    if (x==0){
                    return (
                        <Button type="primary"  onClick = {()=>this.deal(x,y,z)} >成交</Button>
                    )
                }else{
                    return '已成交'
                }}
            },
            ],
            isCanSubmit:false,
            customerName:null,
            customerPhone:null,
            intention:null,
            staffForDeal:null,
            segmentForDeal:null,
            customerId:null,
        }
    }
    deal(x,y,z)
    {
        this.setState({
            customerId:y.id,
            modifyStatus:true,
        })
    }
    onClick()
    {
        const {channel,staff,segment,customerName,customerPhone} = this.state;
        if(channel&&staff&&segment&&valiedString(customerName,20)&&checkPhone(customerPhone))
        {
            let param = {
                customerName:this.state.customerName,
                customerTelephone:this.state.customerPhone,
                staffId:this.state.staff.staffId,
                channelId:this.state.channel.channelId,
                intention:this.state.intention
            }
            CustomerHandler.addCustomer(param,()=>{console.log('老米');if(this.props.delegate){this.props.delegate()}},()=>{});
            this.setState({visible:false})
        }else {
            message.warning('请输入有效的内容',1);
        }
    }
    dealClick()
    {
        const {staffForDeal,segmentForDeal} = this.state;
        if(staffForDeal&&segmentForDeal)
        {
            let param = {
                id:this.state.customerId,
                status:1,
            }
            CustomerHandler.updateCustomer(param,()=>{console.log('老米');if(this.props.delegate){this.props.delegate()}},()=>{});
            this.setState({modifyStatus:false})
        }else {
            message.warning('请选择有效的内容',1);
        }
    }
    modifyModel()
    {
        return (
            <div>
                <Modal
                    title="达成交易"
                    visible={this.state.modifyStatus}
                    onOk={this.dealClick.bind(this)}
                    onCancel={()=>this.setState({modifyStatus:false})}
                >


                    <h5><span>成交人</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <div>
                        <Select  style={{ width: 240 }} onChange={(v)=>{this.setState({staffForDeal:v})}}>
                            {
                                this.props.staff.map((v,i)=>{
                                    return (
                                        <Option key={i} value={v}>{v.staffName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <h5><span>成交时段</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <div>
                        <Select  style={{ width: 240 }} onChange={(v)=>{this.setState({segmentForDeal:v})}}>
                            {
                                this.props.segment.map((v,i)=>{
                                    return (
                                        <Option key={i} value={v}>{v.segmentName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </Modal>
            </div>

        )
    }
    model()
    {
        return (
            <div>
                <Modal
                    title="新增意向用户"
                    visible={this.state.visible}
                    onOk={this.onClick.bind(this)}
                    onCancel={()=>this.setState({visible:false})}
                >

                    <h5><span>客户姓名</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <Input placeholder="客户姓名" name="customerName" onInput={(e)=>this.setState({customerName:e.target.value})}/>
                    <h5><span>客户电话</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <Input placeholder="客户电话" name="customerPhone" onInput={(e)=>this.setState({customerPhone:e.target.value})}/>
                    <h5><span>渠道</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <div>
                        <Select  style={{ width: 240 }} onChange={(v)=>{this.setState({channel:v})}}>
                            {
                                this.props.channel.map((v,i)=>{
                                    return (
                                        <Option key={i} value={v}>{v.channelName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>

                    <h5><span>接待员工</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <div>
                        <Select  style={{ width: 240 }} onChange={(v)=>{this.setState({staff:v})}}>
                            {
                                this.props.staff.map((v,i)=>{
                                    return (
                                        <Option key={i} value={v}>{v.staffName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <h5><span>时段</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <div style={{marginBottom:5}}>
                        <Select  style={{ width: 240 }} onChange={(v)=>{this.setState({segment:v})}}>
                            {
                                this.props.segment.map((v,i)=>{
                                    return (
                                        <Option key={i} value={v}>{v.segmentName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <h5>来访目的</h5>
                    <Input placeholder="来访目的" name="customerName" onInput={(e)=>this.setState({intention:e.target.value})}/>
                    <Alert
                        message="提示"
                        description="带'※'为必填项"
                        type="warning"
                    />


                </Modal>
            </div>
        )
    }
    render() {
        return (
            <div style={{margin:10}}>
                <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>意向客户列表</h3>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
                </div>
                <Table dataSource={this.props.customer} columns={this.state.columns}/>
                {this.model()}
                {this.modifyModel()}
            </div>

        )
    }

    componentDidMount() {
        //this.loadData();
    }

    loadData() {
        CustomerHandler.getAllCustomer((data)=> {
            this.setState({
                dataSource: data
            })
        }, (faile)=> {

        })
    }
}