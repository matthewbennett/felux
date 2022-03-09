import './App.css';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard/Dashboard';
import QouteProvider from './context/QouteProvider';

function App() {
  return (
    <div>
      <QouteProvider>
        <Dashboard />
      </QouteProvider>
    </div>
  );
}

export default App;
