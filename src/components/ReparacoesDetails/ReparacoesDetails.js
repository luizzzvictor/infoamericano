import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Spinner } from "react-bootstrap";
import EditInfoReparacoes from "../EditInfoReparacoes/EditInfoReparacoes";

function ReparacoesDetails({ apiURL, form, setForm }) {

      const [reparacoes, setReparacoes] = useState({});
      const [isLoading, setIsLoading] = useState(true);
      const { id } = useParams();
      const navigate = useNavigate();

  // -------- USE EFFECT PARA REQUISIÇÃO --------
    useEffect(() => {
    try {
      const fetchReparacoes = async () => {
        const response = await axios.get(`${apiURL}/${id}`);
        setReparacoes(response.data);
        setIsLoading(false);
      };
      fetchReparacoes();
    } catch (error) {
      console.log(error);
    }
  }, [apiURL, id]);

  // -------- FUNÇÃO PARA DELETAR ITEM --------
  const deleteReparacoes = async (id) => {
    await axios.delete(`${apiURL}/${id}`);
    navigate("/reparacoes/:id");
    toast.success("Informação sobre reparações deletada com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // -------- RENDERIZAÇÃO DE HTML --------
  return (
    <Container
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      {
        isLoading && <Spinner animation="border" />
      }
      {
        !isLoading && (
          <Card className="text-center w-100">
            <Card.Header>
              <Card.Title className="m-0">
                <h3>{reparacoes.id}</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        )
      }
    </Container>
  );
}

export default ReparacoesDetails;
