import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Body', dataIndex: 'body', key: 'body' },
  // Add more columns as needed
];

const PostsTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default PostsTable;
