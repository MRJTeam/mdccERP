/**
 * Created by shenqiao on 2017/12/23.
 */

import React, {Component} from 'react'

export default class Channel extends Component {
    constructor() {
        super();
        this.state = {
            data: this.testData(),
            tableHead: ['id', 'name', 'description']
        }
    }

    testData() {
        let arr = [];
        const max = 100;
        for (let i = 1; i <= max; i++) {
            arr.push({
                id: 'id' + i,
                name: 'name' + i,
                description: 'description' + i,
            })
        }
        return arr;
    }

    render() {
        return (
            <div>
                {this.state.data.map((item, i)=> {
                        return (
                            <div style={{flex:1,height:30,flexDirection:'row',display:'flex',justifyContent:'center',borderBottom:'1px solid #ccc'}} key={i}>
                                {
                                    this.state.tableHead.map((k, j)=> {
                                        return (
                                            <div style={{flex:1}}>
                                                <p>{item[k]}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}