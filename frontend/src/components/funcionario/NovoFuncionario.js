// frontend/src/components/funcionario/NovoFuncionario.js
import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import api from "../../services/api";

import "./NovoFuncionario.css";

const NovoFuncionario = () => {
  const navigate = useNavigate();

  // Estados para os dados do novo funcionário
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nivel_acesso, setNivelAcesso] = useState(1);
  const [setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setFeedbackMessage({ type: "", message: "" });

    if (!login || !senha || !nome || !email || !telefone || !nivel_acesso) {
        setFeedbackMessage({ type: "danger", message: "Por favor, preencha todos os campos obrigatórios." });
        setLoading(false);
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setFeedbackMessage({ type: "danger", message: "Por favor, insira um endereço de e-mail válido." });
        setLoading(false);
        return;
    }

    try {
      const response = await api.post("/User/cadastro", {
        login,
        senha,
        nome,
        email,
        telefone,
        nivel_acesso
      });

      console.log("Funcionário criado com sucesso:", response.data);
      setFeedbackMessage({ type: "success", message: "Funcionário cadastrado com sucesso!" });

      // Limpar formulário após sucesso
      setLogin("");
      setSenha("");
      setNome("");
      setEmail("");
      setTelefone("");
      setNivelAcesso(1);

      startTransition(() => {
        setTimeout(() => {
            navigate("/funcionarios");
        }, 1500);
      });
      
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      if (error.response) {
        setFeedbackMessage({ type: "danger", message: error.response.data.message || "Erro ao cadastrar funcionário." });
      } else if (error.request) {
        setFeedbackMessage({ type: "danger", message: "Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está rodando." });
      } else {
        setFeedbackMessage({ type: "danger", message: "Erro desconhecido ao tentar cadastrar funcionário." });
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="cadastro-funcionario-container">
      <header className="cadastro-funcionario-header">
        <h1>Cadastrar Novo Funcionário</h1>
      </header>

      {feedbackMessage.message && (
        <Alert color={feedbackMessage.type} className="mt-3">
          {feedbackMessage.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="cadastro-funcionario-form">
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="login">Login <span className="text-form">*</span></Label>
              <Input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                maxLength={50}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="senha">Senha <span className="text-form">*</span></Label>
              <Input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label htmlFor="nome">Nome Completo <span className="text-form">*</span></Label>
              <Input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={100}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="email">E-mail <span className="text-form">*</span></Label>
              <Input
                type="email" // Tipo "email" para validação de formato no navegador
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={100}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="telefone">Telefone <span className="text-form">*</span></Label>
              <Input
                type="text" // Pode ser 'tel' para teclados numéricos em mobile
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                maxLength={20}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label htmlFor="nivelAcesso">Nível de Acesso <span className="text-form">*</span></Label>
              <Input
                type="select"
                id="nivelAcesso"
                value={nivel_acesso}
                onChange={(e) => setNivelAcesso(parseInt(e.target.value))}
                required
              >
                <option value={1}>Nível 1</option>
                <option value={2}>Nível 2</option>
                <option value={3}>Nível 3</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="form-buttons">
          <Col className="text-center">
            <Button className="button-cadastrar" type="submit">
             Cadastrar Funcionário
            </Button>
            <Button className="ml-3 button-voltar" onClick={() => navigate("/ListagemFuncionarios")}>
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NovoFuncionario;