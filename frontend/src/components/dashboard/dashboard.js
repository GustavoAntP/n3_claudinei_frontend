// frontend/src/components/Dashboard.js
import React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../../services";

function Dashboard() {

  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.nivelAcesso === 3) {
        navigate("/ListagemFuncionarios");
      }
    } else {
      navigate("/login");
    }
  };

  const handleNavigateRelatorio = () => {
    const token = getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.nivelAcesso === 3) {
        navigate("/CadastroRelatorioDespesa");
      }
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Olá, seja bem-vindo(a)!</h1>
      <button className='buttonFunc' onClick={handleNavigate}>
        <b>CRUD Funcionario</b>
      </button>
      <button className='buttonFunc' onClick={handleNavigateRelatorio}>
        <b>Cadastro de Relatório de Despesa</b>
      </button>
      <button className='buttonSair' onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Dashboard;