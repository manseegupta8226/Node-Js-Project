import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import Navigationbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState(null)
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {


    axios.get('/get-order', {
      params: {
        user_id: user._id
      }
    })
      .then(response => {
        // handle success
        setOrders(response.data);
      })
      .catch(error => {
        // handle error
      });
  }, [])

  return (
    <>
      <Navigationbar></Navigationbar>
      <h1> My Orders</h1>
      {orders && <OrderList orders={orders} />}
    </>
  )
}

export default Orders;