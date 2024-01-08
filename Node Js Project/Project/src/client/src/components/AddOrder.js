import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigationbar from './Navbar';
import { useNavigate } from "react-router-dom";
const AddOrder = () => {
    const [formData, setFormData] = useState()
    const user = JSON.parse(window.localStorage.getItem("user"));
    const navigate = useNavigate();
    const ChangeHandler = (event) => {
        console.log("changed text");
        var { name, value } = event.target;
        console.log(name);
        console.log(value);
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }

    const clickHandler = async () => {
        const user_id = user._id
        const { orderItem, sub_total, phone_number } = formData
        axios.post("/add-order", {
            user_id, orderItem, sub_total, phone_number
        }).then(res => {
            console.log(res)
            navigate("/allOrders");
        }).catch(err => {
            console.log(err)

        })

    }


    return (
        <>
            <Navigationbar></Navigationbar>
            <h2> Add order</h2>
            <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Order Item</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="text" name="orderItem" placeholder="Enter order item" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Sub total</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="number" name="sub_total" placeholder="Enter SubTotal" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Enter phone number</Form.Label>
                    <Form.Control onChange={ChangeHandler} type="number" name="phone_number" placeholder="Enter phone number" />
                </Form.Group>
                <Button onClick={clickHandler} variant="primary" >
                    Submit
                </Button>
            </Form>
        </>

    );
}

export default AddOrder;