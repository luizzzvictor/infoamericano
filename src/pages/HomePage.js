import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
        <Button className="p-4" variant="dark" size="lg">
            <Link className="nav-link" to="/reparacoes">
                InfoAmericano
            </Link>
        </Button>
    </Container>
    );
};

export default HomePage;