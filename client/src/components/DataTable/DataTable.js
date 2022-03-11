import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd';
import Filter from '../Filter/Filter';
import './DataTable.css';
import { quoteContext } from '../../context/QuoteProvider';


function DataTable({quotes}) {
    const context = useContext(quoteContext);
    const [products, updateProducts] = context.useProducts;
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
        const updatatedProdcuts = products;
        if(updatatedProdcuts[product.Product] && updatatedProdcuts[product.Product].price == price) {
            delete updatatedProdcuts[product.Product];
        } else {
            updatatedProdcuts[product.Product] = {
                price: price,
                product: product.Product,
                weight: product.Weight
            };
        }
        updateProducts(updatatedProdcuts);
        const newQuotes = formateQuotes(quotes, filter);
        updateQuotes([...newQuotes]);
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

            if(products[record.Product] && products[record.Product].price == text) {
                bgColor = '#3498DB';
                textColor = '#fff';
            }
            
            return {
                props: {
                    style: { background: bgColor, color: textColor, cursor: 'pointer', height: '100%' }
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
        updateProducts({});
    }, [filter]);

    useEffect(() => {
        console.log('qoute change');
        const newTable = genTable(formattedQuotes, columns);
        updateTable(newTable);
        
        // update stats 
        //pounds
        const totals = getTotals(products);
        const updatedPounds = Object.create(totalPounds);
        updatedPounds.value = totals.pounds / 1000;
        updateTotalPounds(updatedPounds);
        //invoice
        const updatedInvoice = Object.create(invoiceAmount);
        updatedInvoice.value = totals.invoice;
        updateInvoiceAmount(updatedInvoice);
        //cwt
        const updatedCWT = Object.create(CWT);
        updatedCWT.value = totals.cwt;
        updateCWT(updatedCWT);
        
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

const getTotals = (prds) => {
    let pSum = 0;
    let invoiceTotal = 0;
    let cwt = 0;

    for (const [key, value] of Object.entries(prds)) {
        console.log(`${key}: ${value}`);
        pSum = value.weight + pSum;
        invoiceTotal = invoiceTotal + (value.weight / 100 * parseFloat(value.price));
    }
    if(pSum && invoiceTotal) {
        cwt = invoiceTotal / (pSum / 1000) * 0.100;
    }
    return {
        pounds: pSum,
        invoice: invoiceTotal,
        cwt
    };
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

