import axios from "axios"
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Accordion from 'react-bootstrap/Accordion';

// import Spinner from 'react-bootstrap/Spinner';
// import Modal from 'react-bootstrap/Modal';


export default function ListEstados() {

    const navigate = useNavigate();

    const [estados, setEstados] = useState([]);
    const [info, setInfo] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getEstados();
    }, []);

    function getEstados() {
        axios.get(`http://localhost/web/api/estados/${id}`).then(function (response) {
            
            console.log(response.data);

            if(response.data.estados!=0){
                setEstados(response.data.estados);
                setInfo(response.data.info);
            }
            else{

                alert('no se encontraron estados');
                navigate('/');

            }
        });
    }

    return (

        <Container fluid>
            <Row>
                <div>

                    <h1> Estados en {info.map((inf, key) => <span key={key}> {inf.name} {inf.emoji} </span> )}</h1>

                    <Table striped bordered hover>

                        <thead>
                            <tr>
                                <th>id</th>
                                <th>estado</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {estados.map((estado, key) =>
                                <tr key={key}>
                                    <td>{estado.id}</td>
                                    <td>{estado.name}</td>
                                </tr>
                            )}
                        </tbody>

                    </Table>

                </div>
            </Row>
        </Container>

    )

}