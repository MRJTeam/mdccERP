/**
 * Created by shenqiao on 2017/12/23.
 */

import {Table,Button} from 'antd'
import React, {Component} from 'react'
import {StaffHandler} from '../../HttpRequest/StaffHandler'
export  default class StaffViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [
            ],
            columns: [{
                title: '姓名',
                dataIndex: 'staffName',
                key: 'staffName',
            }, {
                title: '电话',
                dataIndex: 'staffTelephone',
                key: 'staffTelephone',
            }]
        }
    }

    render() {
        return ( 
<div style={{margin:10}}>
<div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>员工管理</h3>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
                </div>
<Table dataSource={this.state.dataSource} columns={this.state.columns}/>
</div>
        
    
    )
    }
    componentDidMount()
    {
        this.loadData();
    }

    loadData()
    {
        StaffHandler.getAllStaff((data)=>{
            this.setState({
                dataSource:data
            })
        },(faile)=>{

        })
    }
}

