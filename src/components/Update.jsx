import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Col, Form, Spinner } from 'react-bootstrap';

// Function to fetch a single product by ID (for pre-filling the form)
const fetchProductById = async (productId) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
};

// Function to update the product (using PUT method)
const updateProduct = async ({ productId, product }) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return response.json();
};

const UpdateProduct = ({ productId }) => {
    const queryClient = useQueryClient();
    const [productData, setProductData] = useState(null);  // State to hold the fetched product data
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Fetch product data by ID to pre-fill the form
    useEffect(() => {
        fetchProductById(productId)
            .then(data => setProductData(data))
            .catch(err => console.error('Error fetching product:', err));
    }, [productId]);

    // Mutation for updating the product
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Product updated with ID:', data.id);
            queryClient.invalidateQueries(['products']);
            setTimeout(() => setShowSuccessAlert(false), 5000);
        },
    });

    // Handle form submission for updating product
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedProduct = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
            image: formData.get('image'),
            category: formData.get('category')
        };
        mutate({ productId, product: updatedProduct });
    };

    if (!productData) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            {isError && <Alert variant="danger">An error occurred: {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">Product updated successfully!</Alert>}
            <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            defaultValue={productData.title} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="price" 
                            min="0" 
                            step="any" 
                            defaultValue={productData.price} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="description" 
                            defaultValue={productData.description} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control 
                            type="url" 
                            name="image" 
                            defaultValue={productData.image} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="category" 
                            defaultValue={productData.category} 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Product'}
                    </Button>
                </Form>
            </Col>
        </div>
    );
};

export default UpdateProduct;
