// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/Login';
import Dashboard from './components/dashboard/dashboard';
import ListagemFuncionarios from './components/funcionario/ListagemFuncionarios';
import NovoFuncionario from './components/funcionario/NovoFuncionario';
import CadastroRelatorioDespesa from './components/relatorio/CadastroRelatorioDespesa';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ListagemFuncionarios" element={<ListagemFuncionarios />} />
        <Route path="/NovoFuncionario" element={<NovoFuncionario />} />
        <Route path='/CadastroRelatorioDespesa' element={<CadastroRelatorioDespesa/>}></Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;