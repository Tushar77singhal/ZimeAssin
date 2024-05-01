import React from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

const FilterAndSearch = ({ tags, selectedTags, handleTagChange, handleSearch }) => {
  return (
    <div>
      <Select mode="multiple" value={selectedTags} onChange={handleTagChange}>
        {tags.map(tag => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
      <Input.Search placeholder="Search posts" onSearch={handleSearch} />
    </div>
  );
};

export default FilterAndSearch;
