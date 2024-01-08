import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigationbar from "./Navbar";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';


function Login() {
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

    const login = async () => {
        console.log(formData)
        const { phone_number, password } = formData
        axios.post("/login-user", {
            phone_number, password
        }).then(res => {
            console.log(res)
            window.localStorage.setItem("user", JSON.stringify(res.data))
            navigate('/')

        }).catch(err => {
            console.log(err)
            setError(err.response.data)
        })
    }

    const Googleauth = useGoogleLogin({
        onSuccess: async respose => {

            axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            }).then(APIresponse => {
                console.log(APIresponse.data.email)
                console.log(respose)
                return axios.post('/login-user',
                    {
                        email: APIresponse.data.email,
                        name: APIresponse.data.name,
                        login_by: "google"

                    }
                    , {
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
            }).then(data => {

                window.localStorage.setItem("user", JSON.stringify(data.data))
                console.log("success");
                navigate('/')
            })
                .catch(err => {
                    console.log(err);
                })

        }
    });

    return (
        <>
            <Navigationbar></Navigationbar>
            <h1>Login</h1>
            <Form>
                {
                    error.length == 0 ? null : (

                        <p style={{ color: 'red', fontSize: '12px', display: 'block', marginLeft: 'auto', marginRight: "auto", width: '60%', marginBottom: '-1px' }}><i class="zmdi zmdi-close-circle material-icons-name mr-2"></i>{error}</p>

                    )
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="number" name="phone_number" placeholder="Enter phone number" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="password" name="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={login} variant="primary" >
                    Submit
                </Button>

                <Form.Group>
                    <Button style={{marginTop:'10px'}} onClick={Googleauth}>
                        <i class="fa-brands fa-google"></i>
                        Continue with google
                    </Button>
                </Form.Group>
            </Form>
        </>

    );
}

export default Login