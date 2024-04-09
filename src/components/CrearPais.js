import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


export default function CrearPais() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        axios.post('http://localhost/web/api/pais/save', inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        })

        console.log(inputs);
    }


    return (

        <Container fluid>
            <Row>
                <div>
                    <h1>Nuevo páis</h1>


                    <form onSubmit={handleSubmit}>


                        <Table>

                            <tbody>
                                <tr>
                                    <th>
                                        <label>Name: </label>
                                    </th>
                                    <td>
                                        <Form.Control value={inputs.name} name="name" onChange={handleChange} size="md" type="text" placeholder="Name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" align="right">
                                        <Button variant="primary" type="submit">Send</Button>
                                    </td>
                                </tr>
                            </tbody>


                        </Table>

                    </form>
                </div>
            </Row>
        </Container>

    )
}