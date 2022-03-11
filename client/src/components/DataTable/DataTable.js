import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd';
import Filter from '../Filter/Filter';
import './DataTable.css';
import { quoteContext } from '../../context/QuoteProvider';


function DataTable({quotes}) {
    const context = useContext(quoteContext);
    const [totalPounds, updateTotalPounds] = context.usePounds;
    const [invoiceAmount, updateInvoiceAmount] = context.useInvoice;
    const [CWT, updateCWT] = context.useCWT;
    const [filter, changeFilter] = useState('FinalPrice');
    const [formattedQuotes, updateQuotes] = useState();
    const [table, updateTable] = useState();
    const companies = [];
    const filterOptions = [
        {
            value: 'FinalPrice',
            label: 'Final Price'
        },
        {
            value: 'PackagingFee',
            label: 'Packaging Fee'
        },
        {
            value: 'FreightFee',
            label: 'Freight Fee'
        }
    ];

    for(let quote in quotes) {
        quotes[quote].Quotes.map((item, i) => {
            // attempt to add new company to list of companies 
            if(companies.indexOf(item.Company) === -1) {
                companies.push(item.Company);
            }
        });
    }

    const selectProduct = (product, price) => {
        console.log(product);
        const updatedCWT = Object.create(CWT);
        updatedCWT.value = price;
        const invoiceValue = (product.Weight / 100 * parseInt(price));
        const updatedInvoiceAmount = Object.create(invoiceAmount);
        updatedInvoiceAmount.value = invoiceValue;
        const updatedPounds = Object.create(totalPounds);
        updatedPounds.value = product.Weight / 1000;
        updateCWT(updatedCWT);
        updateTotalPounds(updatedPounds);
        updateInvoiceAmount(updatedInvoiceAmount);
    };

    const dynamicColumns = companies.map((item, i) => {
        return {
            title: item,
            dataIndex: item,
            key: i,
            render(text, record) {
            let bestPrice = Number.MAX_VALUE;
            let worstPrice = -1;
            let bgColor = '#fff';
            let textColor = '#000';
            for(let c in companies) {
                worstPrice = record[companies[c]] > worstPrice ? record[companies[c]] : worstPrice;
                bestPrice = record[companies[c]] < bestPrice ? record[companies[c]] : bestPrice;
            }

            if(worstPrice == text) {
                bgColor = '#ff0000c4';
                textColor = '#fff';
            }

            if(bestPrice == text) {
                bgColor = '#24b324';
                textColor = '#fff';
            }
            
            return {
                props: {
                    style: { background: bgColor, color: textColor, cursor: 'pointer' }
                    },
                    children: <div onClick={() => {selectProduct(record, text)}}>{text}</div>
                };
            }
        };
    });

    const columns = [
        {
            title: 'Location',
            dataIndex: 'Location',
            key: genKey(),
        },
        {
            title: 'Part #',
            dataIndex: 'PartNo',
            key: genKey(),
        },
        {
            title: 'Steel Product',
            dataIndex: 'Product',
            key: genKey(),
        },
        {
            title: 'Weight',
            dataIndex: 'Weight',
            key: genKey(),
        }
    ];

    Array.prototype.push.apply(columns, dynamicColumns); 

    useEffect(() => {
        updateTable('');
        const newQuotes = formateQuotes(quotes, filter);
        updateQuotes([...newQuotes]);
    }, [filter]);

    useEffect(() => {
        console.log('qoute change');
        const newTable = genTable(formattedQuotes, columns);
        updateTable(newTable);
    },[formattedQuotes]);

  return (
      <div>
          <Filter optionValues={filterOptions} defaultIndex={0} updateFilter={changeFilter} />
          <div className='spacer' />
          {table}
      </div>
  )
}

DataTable.propTypes = {
    quotes: PropTypes.array
}

const genKey = () => {
   return (Math.random() + 1).toString(36).substring(7)
};

const genTable = (tableData, columnData) => {
    // this isn't ideal but it helps to make sure the table is being updated on state change. 
    return (<Table className='quote-table' columns={columnData} dataSource={tableData} />);
}

const formateQuotes = (quotes, filter) => {
    for(let quote in quotes) {
        quotes[quote].key = quote;
        quotes[quote]['Quotes'].map((item, i) => {
            quotes[quote][item.Company] = item[filter]; 
        });
    }
    return quotes;
}

export default DataTable

