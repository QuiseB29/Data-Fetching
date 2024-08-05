import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
//import { useEffect } from 'react';
import { Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
//import { fetchProducts } from '../features/products/productsSlice';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
}



const ProductCatalog = () => {
    const dispatch = useDispatch();

    //const products = useSelector((state) => state.products.items);
    //const productsStatus = useSelector((state) => state.products.status);
    //const error = useSelector((state) => state.products.error);

    //useEffect(() => {
        //if (productsStatus === 'idle') {
          //  dispatch(fetchProducts());
       // }
  //  }, [productsStatus, dispatch]);

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    const handleAddToCart = (id) => {
        dispatch(addItem({ id }));
    };

    if (isLoading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">{error.message}</Alert>

    return (
        <div>
            <h2>Product Catalog</h2>
           {/* {productsStatus === 'loading' && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {productsStatus === 'failed' && <Alert variant="danger">{error}</Alert>}*/}
            <Row xs={1} md={4} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Card style={{ width: '18rem' }}>
                            <div style={{ padding: '10px' }}>
                                <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'contain' }} />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductCatalog;
