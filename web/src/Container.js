/**
 * Created by shenqiao on 2017/12/23.
 */
/**
 * Created by shenqiao on 2017/12/20.
 */

import {Menu} from 'antd'
import React, {Component} from 'react'
import Top from './Top'
import Buttom from './Bottom'
import Channel from './Content/channel'
import { Layout ,Breadcrumb} from 'antd';
import { Button } from 'antd';
import CustomerViewController from './Content/customer'
import ChannelViewController from './Content/channel'
import SegmentViewController from './Content/segment'
import StaffViewController from './Content/staff'
import {CustomerHandler} from './HttpRequest/CustomerHandler'
import {StaffHandler} from './HttpRequest/StaffHandler'
import {ChannelHandler} from './HttpRequest/ChannelHandler'
import {SegmentHandler} from './HttpRequest/SegmentHandler'
const menu = [
    '客户管理',
    '分段管理',
    '渠道管理',
    '员工管理',
]

export default class Container extends Component {
    constructor() {
        super();

        this.state = {
            currentIndex: 1,//单页应用;表示当前展示是那一页的内容
            customer:[],
            staff:[],
            channel:[],
            segment:[],
        }
    }
    render() {
        console.log(this.state.currentIndex);
        return (
            <div style={{flex:1,flexDirection:'column',alignContent:'space-between'}}>
                <Top name="老米"/>
                <div style={{flex:1,flexDirection:'column'}}>
                    <div style={{flex:1,flexDirection:'row',display:'flex'}}>
                        {this.menuPart()}
                        <div style={{flex:1,alignContent:'flex-end',}}>
                            {this.content(this.state.currentIndex)}
                        </div>
                    </div>
                </div>
                <Buttom/>
            </div>


        )
    }
    menuPart() {

        return (
            <Menu defaultSelectedKeys = {['1']} style={{width:150}} theme='dark' onClick={(item)=>this.setState({currentIndex:item.key})}>
                {
                    menu.map((x,i)=>{
                        return (<Menu.Item key={i+1}>{x}</Menu.Item>)
                    })
                }
            </Menu>
        )
    }
    componentDidMount()
    {
        this.loadData();
    }
    loadData()
    {
        CustomerHandler.getAllCustomer((data)=>{
            this.setState({
                customer:data
            })
        },(faile)=>{

        })
        StaffHandler.getAllStaff((data)=>{
            this.setState({
                staff:data
            })
        },(faile)=>{

        })
        ChannelHandler.getAllChannel((data)=>{
            this.setState({
                channel:data
            })
        },(faile)=>{

        })
        SegmentHandler.getAllSegment((data)=>{
            this.setState({
                segment:data
            })
        },(faile)=>{

        })

    }
    content(index) {
        switch (parseInt(index)) {
            case 1:
                return (<div>
                    <CustomerViewController
                        customer={this.state.customer?this.state.customer:[]}
                        staff={this.state.staff?this.state.staff:[]}
                        channel={this.state.channel?this.state.channel:[]}
                        segment={this.state.segment?this.state.segment:[]}
                    />
                </div>)
                break;
            case 2:
                return (<div>
                    <SegmentViewController />
                </div>)
                break;
            case 3:
                return (<div>
                    <ChannelViewController />
                </div>)
                break;
            case 4:
                return (<StaffViewController />)
                break;
            default:
                return null
        }
    }
}