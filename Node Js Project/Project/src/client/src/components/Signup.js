import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigationbar from "./Navbar";

function Signup() {
    const [formData, setFormData] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const ChangeHandler = (event) => {
        var { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const clickHandler = async () => {
        console.log(formData)
        const { name, email, phone_number, password } = formData
        axios.post("/add-user", {
            name, email, phone_number, password
        }).then(res => {
            console.log(res)
            window.localStorage.setItem("user", JSON.stringify(res.data))
            navigate('/')

        }).catch(err => {
            console.log(err)
            setError(err.response.data)
        })
    }

    return (
        <>
            <Navigationbar></Navigationbar>
            <h1>Register User</h1>
            <Form>
                {
                    error.length == 0 ? null : (

                        <p style={{ color: 'red', fontSize: '12px', display: 'block', marginLeft: 'auto', marginRight: "auto", width: '60%', marginBottom: '-1px' }}><i class="zmdi zmdi-close-circle material-icons-name mr-2"></i>{error}</p>

                    )
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="text" name="name" placeholder="Enter name" />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="email" name="email" placeholder="Enter email" />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="number" name="phone_number" placeholder="Enter phone number" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="password" name="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={clickHandler} variant="primary" >
                    Submit
                </Button>
            </Form>
        </>

    );
}

export default Signup