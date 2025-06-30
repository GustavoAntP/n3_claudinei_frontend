// frontend/src/components/funcionarios/ListagemFuncionarios.js
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { get, remove } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../../services/index";
import './ListagemFuncionarios.css';

function ListagemFuncionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFuncionarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get('/User/listar');
      console.log('Dados de funcionários recebidos:', response.data);
      setFuncionarios(response.data.usuario || []);
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      setError("Erro ao carregar funcionários. Tente novamente mais tarde.");
      if (err.response && err.response.status === 401) {
          navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchFuncionarios();
  }, [fetchFuncionarios]);

  const toggleModal = useCallback(() => setModal(prev => !prev), []);

  const confirmDelete = useCallback((funcionario) => {
    setSelectedFuncionario(funcionario);
    toggleModal();
  }, [toggleModal]);

  // Remova 'remove' das dependências
  const handleDelete = useCallback(async () => {
    if (selectedFuncionario) {
      try {
        await remove(`/User/deletar/${selectedFuncionario.CD_USER}`);
        setFuncionarios(prevFuncionarios => prevFuncionarios.filter(
          (func) => func.CD_USER !== selectedFuncionario.CD_USER
        ));
        toggleModal();
        alert("Funcionário excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir funcionário:", err);
        setError("Erro ao excluir funcionário. Tente novamente.");
        if (err.response && err.response.status === 401) {
            navigate('/login');
        }
      }
    }
  }, [selectedFuncionario, toggleModal, navigate]);

  const handleNavigateCadastro = () => {
      const token = getToken();
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.nivelAcesso === 3) {
          navigate("/NovoFuncionario");
        }
    };
  }

  if (loading) {
    return (
      <Container className="tela mt-4">
        <Row className="text-center">
          <Col>
            <p>Carregando funcionários...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="tela mt-4">
        <Row className="text-center">
          <Col>
            <p className="error-message">{error}</p>
            <Button color="primary" onClick={fetchFuncionarios}>Tentar Novamente</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="tela mt-4">
      <Row className="header align-items-center">
        <Col xs="6">
          <h1>Funcionários</h1>
        </Col>
        <Col xs="6" className="text-right">
          <Button color="default" className="large-cadastrar" onClick={handleNavigateCadastro}>+ Novo Funcionário</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {funcionarios.length > 0 ? (
          funcionarios.map((funcionario) => (
            <Col key={funcionario.CD_USER} xs="12" className="funcionario-item">
              <div className="funcionario-info">
                 <strong>Nome:</strong> {funcionario.NOME}   <br/>
                 <strong>Email:</strong> {funcionario.EMAIL} <br/>
                 <strong>Telefone:</strong> {funcionario.TELEFONE}
                 
              </div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/User/editar/${funcionario.CD_USER}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => confirmDelete(funcionario)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12" className="text-center">
            <p>Nenhum funcionário encontrado.</p>
          </Col>
        )}
      </Row>
      <Row className="footer">
        <Col xs="12" className="text-center">
          <Button  className="large-voltar" id="botaoVoltar" onClick={() => navigate('/dashboard')}>Voltar</Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmação de Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza de que deseja excluir o funcionário {selectedFuncionario && selectedFuncionario.NOME} ?
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDelete}>Excluir</Button>{' '}
          <Button onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ListagemFuncionarios;