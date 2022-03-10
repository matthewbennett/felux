import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Space } from 'antd';

function DataTable({quotes}) {
    const [filter, changeFilter] = useState('FinalPrice');
    const companies = [];

    for(let quote in quotes) {
        quotes[quote].Quotes.map((item, i) => {
            // attempt to add new company to list of companies 
            if(companies.indexOf(item.Company) === -1) {
                companies.push(item.Company);
            }
        });
    }

    for(let quote in quotes) {
        quotes[quote]['Quotes'].map((item, i) => {
            quotes[quote][item.Company] = item[filter]; 
        });
    }

    const dynamicColumns = companies.map((item, i) => {
        return {
            title: item,
            dataIndex: item,
            key: i
        };
    });

    const columns = [
        {
            title: 'Location',
            dataIndex: 'Location',
            key: 'Location',
        },
        {
            title: 'Part #',
            dataIndex: 'PartNo',
            key: 'PartNo',
        },
        {
            title: 'Steel Product',
            dataIndex: 'Product',
            key: 'Product',
        },
        {
            title: 'Weight',
            dataIndex: 'Weight',
            key: 'Weight',
        }
    ];

    Array.prototype.push.apply(columns, dynamicColumns); 



  return (<Table columns={columns} dataSource={quotes} />)
}

DataTable.propTypes = {
    quotes: PropTypes.array
}

export default DataTable

