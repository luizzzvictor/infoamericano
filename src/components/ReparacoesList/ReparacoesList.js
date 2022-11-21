import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ReparacoesList({ apiURL }) {
  const [reparacoes, setReparacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchReparacoes = async () => {
        const response = await axios.get(apiURL);
        setReparacoes(response.data);
        setIsLoading(false);
      };
      fetchReparacoes();
    } catch (error) {
      console.log(error);
    }
  }, [apiURL]);

  //Código para renderizar apenas um Header para os items do Accordion, criei uma nova Array apenas com o valor da propriedade caso
  //fonte: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  const apenasCasos = [...new Set(reparacoes.map((item) => item.caso))];

  const renderCasoHeader = apenasCasos.map((casoDaMedida) => {
    return (
      <Accordion.Item
        eventKey={`${apenasCasos.indexOf(casoDaMedida)}`}
        key={`${apenasCasos.indexOf(casoDaMedida)}`}
      >
        <Accordion.Header>{casoDaMedida}</Accordion.Header>
        <Accordion.Body>
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
                      title={(reparacao.estado_cumprimento === "Cumprida" && "Cumprida") ||
                        (reparacao.estado_cumprimento === "Descumprida" &&
                          "Descumprida") ||
                        (reparacao.estado_cumprimento ===
                          "Pendente de cumprimento" &&
                          "Pendente de cumprimento") ||
                        (reparacao.estado_cumprimento ===
                          "Parcialmente cumprida" &&
                          "Parcialmente cumprida")}
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
      {isLoading && <Spinner className="mt-4" animation="border" />}
      {!isLoading && <Accordion>{renderCasoHeader}</Accordion>}
    </Container>
  );
}

export default ReparacoesList;
