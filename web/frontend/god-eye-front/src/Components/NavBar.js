import React from 'react';
import { Menu, Icon } from 'antd';
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
            <img src="./icon.jpg" alt="Project Icon"/>
        </div>
        <div className="NavBarDiv">  
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="cur-vedio">
                <Icon type="mail" />当前监控
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />历史监控</span>}>
                <MenuItemGroup title="功能">
                    <Menu.Item key="setting:1">查看历史记录</Menu.Item>
                    <Menu.Item key="setting:2">追踪对象</Menu.Item>
                </MenuItemGroup>
                </SubMenu>
            </Menu>
        </div>
      </div>
    );
  }
}

export default NavBar;