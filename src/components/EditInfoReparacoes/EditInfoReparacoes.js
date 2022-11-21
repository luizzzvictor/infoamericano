import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditInfoReparacoes({ id, apiURL, form, setForm }) {
  const navigate = useNavigate();

  // uso do modal
  const [show, setShow] = useState(false);

  //alteração do modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // -------- USE EFFECT PARA REQUISIÇÃO --------
  useEffect(() => {
    const fetchReparacao = async () => {
      const response = await axios.get(`${apiURL}/{id}`);
      setForm(response.data);
    };
    fetchReparacao();
  }, [apiURL, setForm, id]);

  // monitoramento dos inputs do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiURL}/${id}`, form);

      setShow(false);
      navigate("/reparacoes/:id");
      toast.success(
        "Informação sobre cumprimento de medidas atualizada com sucesso!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível atualizar a informação de cumprimento", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  // renderização
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Editar Informação
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Cadastrar nova informação sobre cumprimento de medidas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tribunal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do funcionário"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o número de telefone para contato com DDD"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o endereço de e-mail válido para contato"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remuneração por mês</Form.Label>
              <Form.Control
                type="number"
                placeholder="Insira o valor da remuneração mensal"
                name="salary"
                value={form.salary}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="Disponível">Disponível</option>
                <option value="Alocado">Alocado</option>
                <option value="De Férias">De Férias</option>
                <option value="De Licença">De Licença</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Atualizar Informação
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditInfoReparacoes;
