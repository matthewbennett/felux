import { createContext, useState } from 'react';

export const quoteContext = createContext();

const QuoteProvider = (props) => {
    const [quotes, updateQuotes] = useState(sampleData);
    const [products, updateProducts] = useState({});
    const [totalPounds, updateTotalPounds] = useState({
        title: 'Total Pounds',
        value: 0,
        precision: 2,
        styles: {color: '#3f8600'},
        prefix: null,
        suffix: 'k'
    });
    const [invoiceAmount, updateInvoiceAmount] = useState({
        title: 'Invoice',
        value: 0,
        precision: 2,
        styles: {color: '#3f8600'},
        prefix: '$',
        suffix: null
    });
    const [CWT, updateCWT] = useState({
        title: 'Avg $/CWT',
        value: 0,
        precision: 2,
        styles: {color: '#3f8600'},
        prefix: '$',
        suffix: null
    });

    return (
        <quoteContext.Provider value={{
            useQuotes: [quotes, updateQuotes],
            useInvoice: [invoiceAmount, updateInvoiceAmount],
            usePounds: [totalPounds, updateTotalPounds],
            useProducts: [products, updateProducts],
            useCWT: [CWT, updateCWT]
            }}>
            {props.children}
        </quoteContext.Provider>
    );
};

export default QuoteProvider;

const sampleData = [
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "12345",
        "Product": "HR CSB PKL O 0.093x48x96",
        "Weight": 400000,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 32.49,
                "PackagingFee": 0.59,
                "FreightFee": 1.54
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 31.99,
                "PackagingFee": 0.69,
                "FreightFee": 1.58
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 25.90,
                "PackagingFee": 0.89,
                "FreightFee": 1.25
            },
             {
                "Company": "RBI",
                "FinalPrice": 35.60,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    },
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "A23456",
        "Product": "CR CSB NCT LO 0.042x47x120",
        "Weight": 215000,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 33.45,
                "PackagingFee": 0.59,
                "FreightFee": 1.54
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 31.99,
                "PackagingFee": 0.69,
                "FreightFee": 1.58
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 40.90,
                "PackagingFee": 0.89,
                "FreightFee": 1.25
            },
             {
                "Company": "RBI",
                "FinalPrice": 35.60,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    },
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "A3456",
        "Product": "GA CSB CTR D G90 0.056x48x72",
        "Weight": 330250,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 29.45,
                "PackagingFee": 0.69,
                "FreightFee": 1.34
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 31.99,
                "PackagingFee": 0.59,
                "FreightFee": 1.56
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 30.90,
                "PackagingFee": 0.89,
                "FreightFee": 1.75
            },
             {
                "Company": "RBI",
                "FinalPrice": 35.60,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    },
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "A4567",
        "Product": "GN CSB CTR D A90 0.0118x48x72",
        "Weight": 245000,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 37.45,
                "PackagingFee": 0.59,
                "FreightFee": 1.54
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 36.99,
                "PackagingFee": 0.69,
                "FreightFee": 1.58
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 42.90,
                "PackagingFee": 0.89,
                "FreightFee": 1.25
            },
             {
                "Company": "RBI",
                "FinalPrice": 35.60,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    },
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "A56789",
        "Product": "GA CSB CTR D G90 0.067x48x72",
        "Weight": 510500,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 32.45,
                "PackagingFee": 0.59,
                "FreightFee": 1.54
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 31.99,
                "PackagingFee": 0.69,
                "FreightFee": 1.58
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 38.90,
                "PackagingFee": 0.89,
                "FreightFee": 1.25
            },
             {
                "Company": "RBI",
                "FinalPrice": 35.60,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    },
    {
        "Location": "Cleveland, Ohio",
        "PartNo": "A67890",
        "Product": "HR CSB PKL O 0.123x48x72",
        "Weight": 25500,
        "Quotes": [
            {
                "Company": "Big Creek Steel",
                "FinalPrice": 31.99,
                "PackagingFee": 0.59,
                "FreightFee": 1.54
            },
             {
                "Company": "Steel Core",
                "FinalPrice": 40.80,
                "PackagingFee": 0.69,
                "FreightFee": 1.58
            },
             {
                "Company": "AC Steel",
                "FinalPrice": 35.60,
                "PackagingFee": 0.89,
                "FreightFee": 1.25
            },
             {
                "Company": "RBI",
                "FinalPrice": 40.90,
                "PackagingFee": 0.79,
                "FreightFee": 1.44
            }
        ]
    }
];