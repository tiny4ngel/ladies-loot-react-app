import React, { useState } from 'react';

const AddProductForm = () => {
    const token = localStorage.getItem('accessToken');
    
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        photoPath: '',
    });

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3030/data/peripherals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                    'X-Admin': true,
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Product creation failed');
            }

            // Handle successful product creation
            console.log('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
            />
             <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Product Name"
            />
             <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="description"
            />
            <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
            />
             <input
                type="text"
                name="photoPath"
                value={product.photoPath}
                onChange={handleChange}
                placeholder="Photo Path (e.g., /images/my-product.jpg)"
            />
            {/* Other product fields */}
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
