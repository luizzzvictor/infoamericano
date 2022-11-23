import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ReparacoesList({ apiURL }) {
  const [reparacoes, setReparacoes] = useState([]);
  const [casos, setCasos] = useState([]);
  const apiURLCasos = "https://ironrest.cyclic.app/casoscorteidh";
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchCasos = async () => {
        const response = await axios.get(apiURLCasos);
        setCasos(response.data);
      };
      fetchCasos();

      const fetchReparacoes = async () => {
        const response = await axios.get(apiURL);
        setReparacoes(response.data);
        setIsLoading(false);
      };
      fetchReparacoes();
    } catch (error) {
      console.log(error);
    }
  }, [apiURL, apiURLCasos]);

  function contarEstadoCumprimento(arr, estado, casoDaMedida) {
    return arr.filter(
      (v) => v.caso === casoDaMedida && v.estado_cumprimento === estado
    ).length;
  }

  //Código para renderizar apenas um Header para os items do Accordion, criei uma nova Array apenas com o valor da propriedade caso
  //fonte: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  const apenasCasos = [...new Set(reparacoes.map((item) => item.caso))];

  const renderCasoHeader = apenasCasos.map((casoDaMedida) => {
    return (
      <Accordion.Item
        eventKey={`${apenasCasos.indexOf(casoDaMedida)}`}
        key={`${apenasCasos.indexOf(casoDaMedida)}`}
      >
        <Accordion.Header>{casoDaMedida} </Accordion.Header>

        <Accordion.Body>
          <Container>
            {casos.map((caso, index) => {
              if (caso.caso === casoDaMedida) {
                return (
                  <Row key={index} className="mb-3 d-flex justify-content-center align-items-center">
                    <Col sm={4}>
                      <img
                        src={caso.imagem}
                        style={{
                          width: "80%",
                          borderRadius: "5px",
                          WebkitFilter: "grayscale(100%)",
                          filter: "grayscale(100%)",
                        }}
                        alt={caso.caso}
                      />
                    </Col>
                    <Col sm={7} style={{textAlign:"justify"}}>
                      <p>{caso.resumo_caso}</p>
                    </Col>
                  </Row>
                );
              }
            })}
          </Container>

          <ProgressBar max={20} className="mb-3">
            <ProgressBar
              animated="true"
              striped
              variant="success"
              now={contarEstadoCumprimento(
                reparacoes,
                "Cumprida",
                casoDaMedida
              )}
              max={
                contarEstadoCumprimento(reparacoes, "Cumprida", casoDaMedida) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Descumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Parcialmente cumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Pendente de cumprimento",
                  casoDaMedida
                )
              }
              label={`${contarEstadoCumprimento(
                reparacoes,
                "Cumprida",
                casoDaMedida
              )} ✅`}
              key={1}
              data-toggle="tooltip"
              data-placement="bottom"
              title={`Medidas de Reparação Cumpridas`}
            />
            <ProgressBar
              animated="true"
              striped
              variant="info"
              now={contarEstadoCumprimento(
                reparacoes,
                "Parcialmente cumprida",
                casoDaMedida
              )}
              max={
                contarEstadoCumprimento(reparacoes, "Cumprida", casoDaMedida) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Descumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Parcialmente cumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Pendente de cumprimento",
                  casoDaMedida
                )
              }
              label={`${contarEstadoCumprimento(
                reparacoes,
                "Parcialmente cumprida",
                casoDaMedida
              )} 🤏🏾`}
              key={4}
              data-toggle="tooltip"
              data-placement="bottom"
              title={`Medidas de Reparação Parcialmente Cumpridas`}
            />
            <ProgressBar
              animated="true"
              variant="warning"
              now={contarEstadoCumprimento(
                reparacoes,
                "Pendente de cumprimento",
                casoDaMedida
              )}
              max={
                contarEstadoCumprimento(reparacoes, "Cumprida", casoDaMedida) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Descumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Parcialmente cumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Pendente de cumprimento",
                  casoDaMedida
                )
              }
              label={`${contarEstadoCumprimento(
                reparacoes,
                "Pendente de cumprimento",
                casoDaMedida
              )} ⚠️`}
              key={2}
              data-toggle="tooltip"
              data-placement="bottom"
              title={`Medidas de Reparação Pendentes de Cumprimento`}
            />
            <ProgressBar
              animated="true"
              striped
              variant="danger"
              now={contarEstadoCumprimento(
                reparacoes,
                "Descumprida",
                casoDaMedida
              )}
              max={
                contarEstadoCumprimento(reparacoes, "Cumprida", casoDaMedida) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Descumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Parcialmente cumprida",
                  casoDaMedida
                ) +
                contarEstadoCumprimento(
                  reparacoes,
                  "Pendente de cumprimento",
                  casoDaMedida
                )
              }
              label={`${contarEstadoCumprimento(
                reparacoes,
                "Descumprida",
                casoDaMedida
              )} 👎🏾`}
              key={3}
              data-toggle="tooltip"
              data-placement="bottom"
              title={`Medidas de Reparação Descumpridas`}
            />
          </ProgressBar>
          <ListGroup as="ol" numbered variant="flush">
            {reparacoes.map((reparacao, index) => {
              if (reparacao.caso === casoDaMedida) {
                return (
                  <ListGroup.Item
                    action
                    as="li"
                    key={index}
                    variant={
                      (reparacao.estado_cumprimento === "Cumprida" &&
                        "success") ||
                      (reparacao.estado_cumprimento === "Descumprida" &&
                        "danger") ||
                      (reparacao.estado_cumprimento ===
                        "Pendente de cumprimento" &&
                        "warning") ||
                      (reparacao.estado_cumprimento ===
                        "Parcialmente cumprida" &&
                        "info")
                    }
                    style={{ textAlign: "justify", cursor: "pointer" }}
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => {
                      navigate(`/reparacoes/${reparacao._id}`);
                    }}
                  >
                    <div className="ms-2 me-auto">{reparacao.reparacao}</div>
                    <Badge
                      bg="light"
                      pill
                      className="ms-3"
                      style={{ textAlign: "center" }}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title={
                        (reparacao.estado_cumprimento === "Cumprida" &&
                          "Cumprida") ||
                        (reparacao.estado_cumprimento === "Descumprida" &&
                          "Descumprida") ||
                        (reparacao.estado_cumprimento ===
                          "Pendente de cumprimento" &&
                          "Pendente de cumprimento") ||
                        (reparacao.estado_cumprimento ===
                          "Parcialmente cumprida" &&
                          "Parcialmente cumprida")
                      }
                    >
                      {(reparacao.estado_cumprimento === "Cumprida" && "✅") ||
                        (reparacao.estado_cumprimento === "Descumprida" &&
                          "👎🏾") ||
                        (reparacao.estado_cumprimento ===
                          "Pendente de cumprimento" &&
                          "⚠️") ||
                        (reparacao.estado_cumprimento ===
                          "Parcialmente cumprida" &&
                          "🤏🏾")}
                    </Badge>
                    <Badge
                      bg="dark"
                      pill
                      className="ms-3"
                      style={{ textAlign: "center" }}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title={`${reparacao.infos_cumprimento.length} info(s) cadastrada(s)`}
                    >
                      {reparacao.infos_cumprimento.length} ||
                    </Badge>
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    );
  });
  // /\ /\

  return (
    <Container>
      <Card className="text-center w-100">
        <Card.Header>
          <Card.Title className="m-0">
            <h4>
              {" "}
              Infos sobre reparações outorgadas pela Corte IDH em relação ao
              Brasil{" "}
            </h4>
          </Card.Title>
        </Card.Header>
      </Card>
      {isLoading && <Spinner className="mt-4" animation="border" />}
      {!isLoading && <Accordion>{renderCasoHeader}</Accordion>}
    </Container>
  );
}

export default ReparacoesList;
