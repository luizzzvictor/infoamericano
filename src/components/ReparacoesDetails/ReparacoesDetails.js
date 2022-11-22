import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import EditInfoReparacoes from "../EditInfoReparacoes/EditInfoReparacoes";

function ReparacoesDetails({ apiURL, form, setForm }) {
  const [reparacao, setReparacao] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // -------- USE EFFECT PARA REQUISIÇÃO --------
  useEffect(() => {
    try {
      const fetchReparacao = async () => {
        const response = await axios.get(`${apiURL}/${id}`);
        setReparacao(response.data);
        setIsLoading(false);
      };
      fetchReparacao();
    } catch (error) {
      console.log(error);
    }
  }, [apiURL, id]);

  // -------- FUNÇÃO PARA DELETAR ITEM --------
  const deleteReparacao = async (id) => {
    await axios.delete(`${apiURL}/${id}`);
    navigate("/reparacoes/:id");
    toast.success(
      "Informação sobre cumprimento de medidas deletada com sucesso!",
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
  };

  // -------- RENDERIZAÇÃO DE HTML --------
  return (
    <Container
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      {isLoading && <Spinner animation="border" />}
      {!isLoading && (
        <Card className="text-center w-100">
          <Card.Header>
            <Card.Title className="m-0">
              <h3> Informações dos Responsáveis sobre o Cumprimento</h3>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="text-center">
                <Card.Text>
                  <strong> Tribunal Informante:</strong> <br />
                  {reparacao.infos_cumprimento[0].tribunal}
                </Card.Text>
                <Card.Text>
                  <strong> Unidade interna do Tribunal:</strong> <br />
                  {reparacao.infos_cumprimento[0].unidade_judiciaria}
                </Card.Text>
                <Card.Text>
                  <strong> Cargo do Usuário:</strong> <br />
                  {reparacao.infos_cumprimento[0].cargo_informante}
                </Card.Text>
                <Card.Text>
                  <strong>
                    {" "}
                    Descrição das ações tomadas para cumprir Medida de
                    Reparação:
                  </strong>{" "}
                  <br />
                  {reparacao.infos_cumprimento[0].infos_relevantes}
                </Card.Text>
                <Card.Text>
                  <strong>
                    {" "}
                    Notificar alteração do status de cumprimento:
                  </strong>{" "}
                  <br />
                  {reparacao.infos_cumprimento[0].notificar_status_cumprimento}
                </Card.Text>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <EditInfoReparacoes
                  id={id}
                  apiURL={apiURL}
                  form={form}
                  setForm={setForm}
                />
              </Col>
              <Col>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Voltar
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => deleteReparacao(reparacao._id)}
                >
                  Excluir Informação sobre Cumprimento
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ReparacoesDetails;
