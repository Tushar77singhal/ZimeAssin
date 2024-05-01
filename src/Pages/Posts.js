// src/pages/Posts.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Spin, Row, Col, message } from 'antd';
import FilterAndSearch from '../Componets/FilterAndSearch';
import PostsTable from '../Componets/PostsTable'

const Posts = () => {
  const { page } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, selectedTags, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/posts?skip=${(page - 1) * 10}&limit=10`);
      const jsonData = await response.json();
      setData(jsonData);
      
      // Extract unique tags from the fetched data
      const uniqueTags = Array.from(new Set(jsonData.flatMap(post => post.tags)));
      setTags(uniqueTags);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = value => {
    setSelectedTags(value);
  };

  const handleSearch = value => {
    setSearchQuery(value);
  };

  const filteredData = data.filter(post => {
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag));
    const matchesSearch = post.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Posts</h1>
      <Divider />
      <FilterAndSearch tags={tags} selectedTags={selectedTags} handleTagChange={handleTagChange} handleSearch={handleSearch} />
      <Divider />
      <Spin spinning={loading}>
        <PostsTable data={filteredData} />
      </Spin>
    </div>
  );
};

export default Posts;
