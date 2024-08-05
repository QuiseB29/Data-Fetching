import {useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Col, Form } from 'react-bootstrap';

const postProduct = async (product) => {
    const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Content-Type':  'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to add new product');
    }
    return response.json();
};

const AddProduct = () => {
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: postProduct,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Product added with ID:', data.id);
            queryClient.invalidateQueries(['products']);
            setTimeout(() => setShowSuccessAlert(false), 5000);
        },
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const product = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
            image: formData.get('image'),
            categoy: formData.get('category')
        };
        mutate(product)
        event.target.reset();
    };

    return (
        <div>
            {isError && <Alert variant="danger">An error occured: {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">Product added successfully!</Alert>}
            <Col md={{ span: 6, offset: 3}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" name="title" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" name="price" min="0" step="any" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Decription</Form.Label>
                        <Form.Control type="decription" as="textarea" rows={3} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="url" placeholder="Enter image url" name="image" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter category" name="category" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </Button>
                </Form>
            
            
            </Col>
        </div>
    )
}

export default AddProduct;