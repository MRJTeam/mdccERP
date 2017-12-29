/**
 * Created by shenqiao on 2017/12/23.
 */

import {Table,Button,Modal,Alert,Input,DatePicker,Radio,message} from 'antd'
const {RangePicker } = DatePicker;
import React, {Component} from 'react'
import {valiedString} from '../../utils'
import moment from 'moment'
export  default class SegmentViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            size: 'default',
            columns: [
                {
                    title: '时段名称',
                    dataIndex: 'segmentName',
                    key: 'name',
                },
                {
                    title: '开始时间',
                    dataIndex: 'start',
                    key: 'start',
                    render:(x,y,z)=>{
                        return (<h5>{moment(x).format('YYYY-MM-DD')}</h5>)
                    }
                }
                ,
                {
                    title: '结束时间',
                    dataIndex: 'end',
                    key: 'end',
                    render:(x,y,z)=>{
                        return (<h5>{moment(x).format('YYYY-MM-DD')}</h5>)
                    }
                },

            ],
            segmentName: null,
            start: null,
            end: null,
        }
    }

    render() {
        return (
            <div style={{margin:10}}>

                <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>时段管理</h3>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
                </div>
                <Table dataSource={this.props.segment?this.props.segment:[]} columns={this.state.columns}/>
                {this.model()}
            </div>
        )
    }

    okClicked() {
        if (valiedString(this.state.channleName, 20)) {
            ChannelHandler.AddChannel({name: this.state.channleName}, this.delegate.bind(this), ()=>message.error('操作失败'))
            this.setState({visible: false})
        } else {
            message.warning('请输入有效的内容', 1);
        }
    }

    datePicker()
    {
        const size = this.state.size
        return (
            <div>

            </div>
        )
    }
    delegate() {
        if (this.props.delegate) {
            this.props.delegate()
        }
    }

    model() {
        return (
            <div>
                <Modal
                    title="添加时段"
                    visible={this.state.visible}
                    onOk={this.okClicked.bind(this)}
                    onCancel={()=>this.setState({visible:false})}
                >
                    <h5><span>时段名称</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <Input placeholder="时段名称" style={{marginBottom:5}}
                           onInput={(e)=>this.setState({segmentName:e.target.value})}/>
                    <h5><span>时段名称</span><span style={{color:'#f00',fontSize:'14px'}}>&nbsp;*</span></h5>
                    <RangePicker size={this.state.size} style={{marginBottom:5}} placeholder={['开始日期', '结束日期']}/>
                    <Alert
                    message="提示"
                    description="带'*'为必填项"
                    type="warning"
                />
                </Modal>
            </div>
        )
    }
}

