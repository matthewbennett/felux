import {React, useState} from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined
} from '@ant-design/icons';
import './Dashboard.css';

const Dashboard = props => {
    const { Header, Content, Footer, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false); // manages the side menu position
    const onCollapse = collapsed => {
        setCollapsed(collapsed); 
    };

  return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                    <h1>Quote Analyzer</h1>
                </div>
                <Menu theme="dark" selectedKeys={'table'} mode="inline">
                    <Menu.Item key={'table'} icon={<DesktopOutlined />}>
                        Table View
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content className='content-container'>
                
            </Content>
            <Footer style={{ textAlign: 'center' }}>Frontend Felux Assessment</Footer>
            </Layout>
        </Layout>
  )
}

export default Dashboard
