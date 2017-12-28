/**
 * Created by shenqiao on 2017/12/23.
 */

import {Table,Button} from 'antd'
import React, {Component} from 'react'

export  default class SegmentViewController extends Component
{
    render()
    {
        return ( 
            <div style={{margin:10}}>

                <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>分段管理</h3>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        
        
    
    )
    }
}

const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

<Table dataSource={dataSource} columns={columns} />
/**
 * Created by shenqiao on 2017/12/24.
 */
/**
 * Created by shenqiao on 2017/12/24.
 */
