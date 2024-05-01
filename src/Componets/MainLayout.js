import React from 'react';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content style={{ padding: '0 50px' }}>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
