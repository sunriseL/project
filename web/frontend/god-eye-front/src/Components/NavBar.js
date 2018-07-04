import React from 'react';
import { Menu, Icon,Layout } from 'antd';
import './NavBar.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class NavBar extends React.Component {
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <div className="NavBarRoot">
        <div className="NavBarDiv">
        <Layout>
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="cur-vedio">
                    <a href="/current-video"><Icon type="mail" />当前监控</a>
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />历史监控</span>}>
                    <MenuItemGroup title="功能">
                        <Menu.Item key="setting:1">
                            <a href="/history-video">查看历史记录</a>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                            <a href="/trace-target">追踪对象</a>
                        </Menu.Item>
                        <Menu.Item key="setting:3">
                            <a href="/settings">设置</a>
                        </Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </Layout>
        </div>
      </div>
    );
  }
}

export default NavBar;