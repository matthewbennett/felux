import {React, useState, useContext} from 'react';
import { Layout, Menu, Space } from 'antd';
import {
  DesktopOutlined
} from '@ant-design/icons';
import './Dashboard.css';
import QuoteStats from '../QuoteStats/QuoteStats';
import DataTable from '../DataTable/DataTable';
import { quoteContext } from '../../context/QuoteProvider';

const Dashboard = props => {
    const { Header, Content, Footer, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false); // manages the side menu position
    const context = useContext(quoteContext);
    const [totalPounds, updateTotalPounds] = context.usePounds;
    const [invoiceAmount, updateInvoiceAmount] = context.useInvoice;
    const [CWT, updateCWT] = context.useCWT;
    const [quotes, updateQuotes] = context.useQuotes;
     
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
                <Space className='full' direction="vertical">
                    <QuoteStats stats={[totalPounds, invoiceAmount, CWT]} />
                    <DataTable quotes={quotes} />
                </Space>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Frontend Felux Assessment</Footer>
            </Layout>
        </Layout>
  )
}

export default Dashboard
