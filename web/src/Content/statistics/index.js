/**
 * Created by shenqiao on 2017/12/23.
 */

import {Table,Button,Modal,Input,Select,Alert,message} from 'antd'
import React, {Component} from 'react'
import {CustomerHandler} from '../../HttpRequest/CustomerHandler'
import {checkPhone,valiedString} from '../../utils'
import ExportJsonExcel from 'js-export-excel'
import moment from 'moment'

export  default class StatisticsViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }




    render() {
        return (
            <div style={{margin:10}}>
                <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
                    <h3>成交详细</h3>
                    <div>
                        <Button type="primary" onClick={()=>this.setState({visible:true})} style={{marginRight:10}}>全部</Button>
                    </div>

                </div>
                <Table dataSource={this.props.customer} columns={this.state.columns} style={{marginRight:0}}/>
            </div>

        )
    }

    componentDidMount() {
    }
}