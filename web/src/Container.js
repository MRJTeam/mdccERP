/**
 * Created by shenqiao on 2017/12/23.
 */
/**
 * Created by shenqiao on 2017/12/20.
 */

import {Menu,SubMenu} from 'antd'
import React, {Component} from 'react'
import Top from './Top'
import Buttom from './Bottom'
import Channel from './Content/channel'
import { Layout ,Breadcrumb} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
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
        }
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        )
    }


    //render() {
    //    return (
    //        <div style={{flex:1,flexDirection: 'column'}}>
    //            <div style={{flex:1,flexDirection:'column',alignContent:'space-between'}}>
    //                <Top name="老米"/>
    //                <div style={{flex:1,flexDirection:'column'}}>
    //                    <div style={{flex:1,flexDirection:'row',display:'flex'}}>
    //                        {this.menuPart()}
    //                        <div style={{flex:1,alignContent:'flex-end',}}>
    //                            {this.content(this.state.currentIndex)}
    //                        </div>
    //
    //                    </div>
    //
    //                </div>
    //                <Buttom/>
    //            </div>
    //        </div>
    //
    //    )
    //}
    menuPart() {

        return (
            <Menu>
                <Menu.Item>菜单项</Menu.Item>
                <Menu.Item>菜单项</Menu.Item>
                <Menu.Item>菜单项</Menu.Item>
                <Menu.Item>菜单项</Menu.Item>
                <Menu.Item>菜单项</Menu.Item>
                <Menu.Item>菜单项</Menu.Item>
            </Menu>
        )
        //return (
        //    <div style={{width:150}}>
        //        {menu.map((k, i)=> {
        //            return (
        //                <div key={i} style={{paddingLeft:10,height:44,borderBottom:'1px solid #000'}}
        //                     onClick={()=>this.setState({currentIndex:1+i})}>
        //                    <p>{k}</p>
        //                </div>
        //            )
        //        })}
        //    </div>
        //
        //)
    }

    content(index) {
        //<div style={{flex:1,backgroundColor:'#0FF',display: 'flex'}}>
        //
        //</div>
        switch (index) {
            case 1:
                return (<div>
                    <p>{index}</p>
                </div>)
                break;
            case 2:
                return (<div>
                    <p>{index}</p>
                </div>)
                break;
            case 3:
                return (<div>
                    <Channel/>
                </div>)
                break;
            case 4:
                return (<div>
                    <p>{index}</p>
                </div>)
                break;
            default:
                return null
        }
    }
}