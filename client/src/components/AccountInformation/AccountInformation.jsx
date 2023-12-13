import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import '../../../public/styles/user-profile.css';


const AccountInformation = () => {
    const token = localStorage.getItem('accessToken');
    const { email, isAuthenticated, userId, billInfoId } = useContext(AuthContext);
    const [billingInfo, setBillingInfo] = useState({
        email: '',
        phone: '',
        city: '',
        address: '',
        zip: ''
    });

    const fetchBillingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3030/data/billingInfo/${billInfoId}`, {
                headers: { 'X-Authorization': token }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch billing information');
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            if (data && data.email !== undefined) {
                setBillingInfo(data);
            } else {
                console.error('Unexpected data structure:', data);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
           
            return;
        }

        fetchBillingDetails();

    }, [token, isAuthenticated, userId, email]);

    const handleChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = `http://localhost:3030/data/billingInfo/${billInfoId}`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify(billingInfo)
            });
            if (!response.ok) {
                throw new Error('Failed to update billing information');
            }
            const updatedData = await response.json();
            console.log('Updated billing info:', updatedData);
            setBillingInfo(updatedData); 

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container">
            <aside className="sidebar">
                <div className="sidebar-item">BILLING INFORMATION</div>
                <div className="sidebar-item">WISHLIST</div>
                <div className="sidebar-item">CART</div>
            </aside>
            <main className="profile-main">
                <div className="profile-header">
                    <div className="image-upload-container">
                        <div className="profile-picture-container">
                            <img src="images/hero.png" alt="Profile Image" className="profile-picture" />
                        </div>
                        <div className="upload-details">
                            <p className="upload-instructions">Change your billing information</p>
                        </div>
                    </div>
                </div>
                <div className="profile-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={billingInfo.email}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Phone number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={billingInfo.phone}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={billingInfo.city}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={billingInfo.address}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip">ZIP Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={billingInfo.zip}
                                onChange={handleChange}
                                required />
                        </div>
                        <button type="submit" className="update-button">Update Information</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AccountInformation;
