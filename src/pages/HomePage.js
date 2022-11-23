import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Corteidh from "../../src/image/Corteidh.png";

const HomePage = () => {
  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={Corteidh} alt="logoCIDH" />
        <Card.Body>
          <Button
            tag="a"
            href="#!"
            className="stretched-link"
            variant="my-4 text-bg-secondary"
            size="lg"
          >
            <Link className="nav-link" to="/inicial">
              InfoAmericano
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
