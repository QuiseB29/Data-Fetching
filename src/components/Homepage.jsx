import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Container } from 'react-bootstrap';
import ProductCatalog from './ProductCatalog';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const { user } = useContext(UserContext);
    const cartCount = useSelector((state) => state.cart.totalItems);
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <h1>Welcome, {user.name}!</h1>
            <p>You are now {user.isLoggedIn ? 'logged in' : 'logged out'}.</p>
            <p>Your cart has {cartCount} item(s).</p>
            <ProductCatalog />
            <button onClick={() => navigate("/cart")}>Cart</button>
        </Container>
    );
}

export default Homepage;
