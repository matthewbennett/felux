import './App.css';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard/Dashboard';
import QuoteProvider from './context/QuoteProvider';

function App() {
  return (
    <div>
      <QuoteProvider>
        <Dashboard />
      </QuoteProvider>
    </div>
  );
}

export default App;
