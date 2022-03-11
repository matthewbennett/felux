import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd';
import './Filter.css';

const Filter = ({optionValues, defaultIndex, updateFilter}) => {
    const { Option } = Select;
    const handleChange = (value) => {
        updateFilter(value);
    };
    const genOption = (optionValue, i) => {
        return <Option key={i} value={optionValue.value}>{optionValue.label}</Option>; 
    };
    const optionItems = optionValues.map(genOption);

    return (
        <Select defaultValue={optionValues[defaultIndex].value} className='filter' onChange={handleChange}>
            {optionItems}
        </Select>
    )
}

Filter.propTypes = {
    optionValues: PropTypes.array,
    defaultIndex: PropTypes.number,
    updateFilter: PropTypes.func
}

export default Filter
