// frontend/src/components/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/api';
import { setToken, setNivel, setId } from '../../services'; 

import './Login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null); 
    setSuccess(false); 
    setLoading(true);

    try {
      const { data } = await post("/User/login", {
        login: login,
        senha: senha,
      });

      console.debug("Login bem-sucedido:", data);

      setToken(data.token);
      setNivel(data.nivelAcesso);
      setId(data.usuarioId);

      setSuccess(true);
      
      if (data.nivelAcesso === 3) {
        navigate("/dashboard");
      } else if (data.nivelAcesso === 2) {
        navigate("/login");
      } else if (data.nivelAcesso === 1) {
        navigate("/login");
      }

    } catch (err) {
      console.error("Erro no login:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erro desconhecido. Por favor, tente novamente.');
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está rodando.');
      } else {
        setError('Erro interno ao tentar fazer login. Por favor, tente novamente.');
      }
      setSuccess(false);
      
      setTimeout(() => {
        setError(null);
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Bem-vindo!</h2>
      <h3>Faça seu login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            aria-label="Campo de login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            aria-label="Campo de senha"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {error && <p className="error-message" role="alert">{error}</p>}
        {success && <p className="success-message" role="status">Login realizado com sucesso!</p>}
      </form>
    </div>
  );
}

export default Login;