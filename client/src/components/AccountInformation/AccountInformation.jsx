import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import '../../../public/styles/user-profile.css';
import * as billingService from '../../services/billingService';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AccountInformation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        phone: '',
        city: '',
        address: '',
        zip: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const billingId = localStorage.getItem('billInfoId');

        if (billingId) {
            billingService.getOne(billingId)
                .then(setBillingInfo)
                .catch(console.error);
        } else {
            billingService.create({ fullName: '', phone: '', city: '', address: '', zip: '' })
                .then(data => {
                    localStorage.setItem('billInfoId', data._id);
                    setBillingInfo(data);
                })
                .catch(console.error);
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const billingId = localStorage.getItem('billInfoId');
            const updatedData = await billingService.edit(billingId, billingInfo);
            setBillingInfo(updatedData);
            toast.success('Successfully updated!')
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container">
            <aside className="sidebar">
                <div className="sidebar-item" style={{ color: '#ffd1fc' }}>BILLING INFORMATION</div>
                <Link to={`/wishlist`}>
                    <div className="sidebar-item">WISHLIST</div>
                </Link>
                <Link to={`/cart`}>
                    <div className="sidebar-item">CART</div>
                </Link>
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
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={billingInfo.fullName}
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