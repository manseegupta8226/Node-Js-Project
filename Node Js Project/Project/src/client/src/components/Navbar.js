import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./auth";

const Navigationbar = () => {
    const auth = useAuth();
    const user = JSON.parse(window.localStorage.getItem("user"));
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                    <NavLink eventKey="2" as={Link} to="/signup">Signup</NavLink>
                    <NavLink eventKey="3" as={Link} to="/login">Login</NavLink>
                    <NavLink eventKey="4" as={Link} to="/allOrders">Get Order</NavLink>
                    <NavLink eventKey="5" as={Link} to="/addOrder">Add Order</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigationbar;