import axios from "axios"
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// import Accordion from 'react-bootstrap/Accordion';
// import Modal from 'react-bootstrap/Modal';


export default function ListUser() {

    const [paises, setPaises] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getPaises();
    }, []);

    function getPaises() {
        setLoading(true);
        axios.get('http://localhost/web/api/').then(function (response) {
            console.log(response.data);
            setPaises(response.data);
            setLoading(false) 
        });
    }

    const deletePais = (id, nombre) => {

        if (window.confirm(`Desea eliminar el registro "${nombre}"`) === true) {
            axios.delete(`http://localhost/web/api/${id}/delete`).then(function (response) {
                console.log(response.data);
                getPaises();
            });
        } else {

        }

    }

    return (

        <Container fluid>
            <Row>
                <div>

                    <h1>Países {isLoading ? <Spinner animation="border" /> : <span></span>}</h1>

                    <Table striped bordered hover>

                        <thead>
                            <tr>
                                <th>id</th>
                                <th>país</th>
                                <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paises.map((pais, key) =>
                                <tr key={key}>
                                    <td>{pais.id}</td>
                                    <td>{pais.name} {pais.emoji}</td>
                                    <td>

                                        <Row className="justify-content-md-center">
                                            <Col>
                                                <Button href={`pais/${pais.id}/edit`}>
                                                    Editar
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button variant="danger" onClick={() => deletePais(pais.id, pais.name)}>
                                                    Delete
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button href={`estados/${pais.id}/ver`}>
                                                    Estados
                                                </Button>
                                            </Col>
                                        </Row>

                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </Table>

                </div>
            </Row>
        </Container>

    )

}