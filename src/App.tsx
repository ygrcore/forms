import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, ReactHookForm, UncontrolledForm } from './pages';
import AppHeader from './components/appHeader/AppHeader';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/rhf" element={<ReactHookForm />} />
            <Route path="/uf" element={<UncontrolledForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
