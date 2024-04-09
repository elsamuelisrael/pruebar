import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import InputGroup from 'react-bootstrap/InputGroup';


export default function EditUser() {
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost/web/api/pais/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        axios.put(`http://localhost/web/api/pais/${id}/edit`, inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });

    }
    return (

        <Container fluid>
            <Row>
                <div>
                    <h1>Editar País</h1>

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