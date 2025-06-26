// frontend/src/components/Login.js
import React, { useState } from 'react';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import './Login.css'; 

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

   const navigate = useNavigate(); // Inicialize o hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    setError(null); // Limpa erros anteriores
    setLoading(true); // Indica que a requisição está em andamento
    setSuccess(false); // Limpa o estado de sucesso

    try {
      const response = await api.post('/User/login', {
        login: login,
        senha: senha,
      });

      console.log('Login bem-sucedido:', response.data);
      setSuccess(true);
      navigate('/dashboard');
      alert('Login realizado com sucesso!');

    } catch (err) {
      console.error('Erro no login:', err);
      if (err.response) {
        setError(err.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está rodando.');
      } else {
        setError('Erro desconhecido ao tentar login.');
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Bem-vindo!</h2>
      <h3>Faça seu login</h3>
      <form onSubmit={handleSubmit}>
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