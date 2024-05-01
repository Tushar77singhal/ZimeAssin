import React, { useState, useEffect } from 'react';
import { Table, Spin, Divider, message, Input, Select, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page'), 10) || 1;
  const search = queryParams.get('search') || '';
  const tags = queryParams.getAll('tags');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(search);
  const [selectedTags, setSelectedTags] = useState(tags);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/posts${location.search}`);
      const jsonData = await response.json();
      setData(jsonData.posts);
      filterData(jsonData.posts, searchQuery, selectedTags);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = value => {
    setSearchQuery(value);
    updateURL({ search: value });
  };

  const handleTagChange = value => {
    setSelectedTags(value);
    updateURL({ tags: value });
  };

  const handlePageChange = page => {
    updateURL({ page });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    updateURL({ search: '', tags: [] });
    setFilteredData(data); // Reset filteredData to the original data
  };

  const updateURL = params => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        params[key].forEach(value => searchParams.append(key, value));
      } else {
        searchParams.set(key, params[key]);
      }
    });
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const filterData = (data, query, tags) => {
    let filtered = [...data];
    if (query) {
      filtered = filtered.filter(post => post.body.toLowerCase().includes(query.toLowerCase()));
    }
    if (tags.length > 0) {
      filtered = filtered.filter(post => tags.every(tag => post.tags.includes(tag)));
    }
    setFilteredData(filtered);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => tags.join(', '),
    },
    { title: 'Reactions', dataIndex: 'reactions', key: 'reactions' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>Home</h1>
      <Divider />
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Input.Search
          placeholder="Search by body"
          value={searchQuery} // Use value instead of defaultValue
          onSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Select
          mode="multiple"
          placeholder="Filter by tags"
          value={selectedTags}
          onChange={handleTagChange}
          style={{ width: '200px' }}
        >
          {data.map(post =>
            post.tags.map(tag => (
              <Option key={tag}>{tag}</Option>
            ))
          )}
        </Select>
        <Button onClick={handleClearFilters} style={{ marginLeft: '10px' }}>Clear Filters</Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            current: page,
            onChange: handlePageChange,
          }}
        />
      </Spin>
    </div>
  );
};

export default Home;
