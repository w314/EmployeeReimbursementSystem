import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReimbursementList from './Components/ReimbursementList/ReimbursementList';
import EmployeeList from './Components/EmployeeList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerPage from './Components/ManagerPage';
import Login from './Components/Login/Login';
import EmployeePage from './Components/EmployeePage/EmployeePage';
import Header from './Components/Header/Header';
import AddReimbursement from './Components/AddReimbursement/AddReimbursement';
import Register from './Components/Register/Register';


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/employees" element={<EmployeeList />}></Route>
          <Route path="/reimbursements" element={<ManagerPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
{/* +          <Route path="/reimbursements/addReimbursement" element={<AddReimbursement />}></ Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
