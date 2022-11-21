import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Spinner } from "react-bootstrap";
import EditInfoReparacoes from "../EditInfoReparacoes/EditInfoReparacoes";

function ReparacoesDetails({ apiURL, form, setForm }) {
  // -------- CRIAÇÃO DE ESTADOS PARA O COMPONENTE --------
  // um estado que representará as informações sobre as reparações
  const [reparacoes, setReparacoes] = useState({});
  // um estado para o carregamento dos dados
  const [isLoading, setIsLoading] = useState(true);
  // identificar o id dinâmico como parâmetro para a requisição
  const { id } = useParams();
  // criação de uma constante para criar uma navegação
  const navigate = useNavigate();

  // -------- USE EFFECT PARA REQUISIÇÃO --------
  // o useEffect captura a requisição uma única vez a cada carregamento de página, evitando o sobrecarregamento do servidor
  useEffect(() => {
    // o try catch é para capturar tentativa e erro no momento da requisição
    try {
      // criação de uma função assíncrona que terá um comportamento síncrono com o async e await
      const fetchReparacoes = async () => {
        // fala para o código esperar (await) a requisição do axios ser feita
        // o get apenas captura para leitura deste item em específico
        const response = await axios.get(`${apiURL}/${id}`);
        // após a requisição pronta, atualiza o estado com as informações da api
        setReparacoes(response.data);
        // o carregamento para ao termos os dados da requisição
        setIsLoading(false);
      };
      // roda a função acima
      fetchReparacoes();
      // captura de erro na requisição
    } catch (error) {
      // imprime no console o erro
      console.log(error);
    }
  }, [apiURL, id]);

  // -------- FUNÇÃO PARA DELETAR ITEM --------
  // criação de uma função assícrona que identificará o id do item
  const deleteReparacoes = async (id) => {
    // espera o axios fazer o delete do item a partir do seu id
    await axios.delete(`${apiURL}/${id}`);
    // após requisição feita navega para a página de listagem
    navigate("/reparacoes/:id");
    // mensagem flutuante na tela de aviso para usuário
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
        // loading verdadeira carrega o spinner
        isLoading && <Spinner animation="border" />
      }
      {
        // loading falso carrega as informações do item
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
