import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddInfoReparacoes({ apiURL, id, form, setForm, reparacao }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(e.target.value)
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clone = { ...reparacao };
      delete clone._id;

      const bodyNovaInfo = clone.infos_cumprimento.push(form);

      await axios.put(`${apiURL}/${id}`, bodyNovaInfo);

      // navigate(`${apiURL}/${id}`);

      toast.success("Novas informações cadastradas!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2 className="my-5">Novas informações sobre Medida de Reparação</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tribunal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome do Tribunal de origem da informação"
                name="tribunal"
                value={form.tribunal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Unidade Judiciária</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira a unidade Judiciária prestadora das informações"
                name="unidade_judiciaria"
                value={form.unidade_judiciaria}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cargo do responsável pelas informações</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o Cargo"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Informações sobre a medida de reparacao</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Insira as informações relevantes sobre o cumprimento da Medida de Reparação"
                name="infos_relevantes"
                value={form.infos_relevantes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                Notificar Alteração/Manutenção do Status de Cumprimento
              </Form.Label>
              <Form.Select
                name="notificar_status_cumprimento"
                onChange={handleChange}
              >
                <option value="0">Selecione uma opção</option>
                <option value="Pendente de cumprimento">
                  Pendente de cumprimento
                </option>
                <option value="Cumprida">Cumprida</option>
                <option value="Parcialmente cumprida">
                  Parcialmente cumprida
                </option>
                <option value="Descumprida">Descumprida</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-4" variant="success" type="submit">
          Cadastrar informação
        </Button>
      </Form>
    </Container>
  );
}

export default AddInfoReparacoes;
