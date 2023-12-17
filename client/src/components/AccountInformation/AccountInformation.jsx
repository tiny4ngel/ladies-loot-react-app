import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import '../../../public/styles/user-profile.css';
import * as billingService from '../../services/billingService';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { validateBillingInfo } from '../../utils/validationPatterns';

const AccountInformation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const { values, onChange, onSubmit, setValues } = useForm(submitBillingInfo, {
        fullName: '',
        phone: '',
        city: '',
        address: '',
        zip: ''
    }, validateBillingInfo);

    const fetchAndUpdateBillingInfo = async () => {
        const billingId = localStorage.getItem('billInfoId');

        if (billingId) {
            try {
                const data = await billingService.getOne(billingId);
                setValues(prev => ({ ...prev, ...data }));
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const data = await billingService.create({ fullName: '', phone: '', city: '', address: '', zip: '' });
                localStorage.setItem('billInfoId', data._id);
                setValues(prev => ({ ...prev, ...data }));
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAndUpdateBillingInfo();
        }
    }, [isAuthenticated]);

    async function submitBillingInfo(billingInfo) {
        try {
            const billingId = localStorage.getItem('billInfoId');
            const updatedData = await billingService.edit(billingId, billingInfo);
            setValues(updatedData);
            toast.success('Successfully updated!');
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={values.fullName}
                                onChange={onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Phone number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={values.phone}
                                onChange={onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={values.city}
                                onChange={onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={values.address}
                                onChange={onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip">ZIP Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={values.zip}
                                onChange={onChange}
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