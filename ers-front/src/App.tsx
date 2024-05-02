import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReimbursementList from './Components/ReimbursementList';
import EmployeeList from './Components/EmployeeList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerPage from './Components/ManagerPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManagerPage />}></Route>
          <Route path="/employees" element={<EmployeeList />}></Route>
          <Route path="/reimbursements" element={<ReimbursementList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
