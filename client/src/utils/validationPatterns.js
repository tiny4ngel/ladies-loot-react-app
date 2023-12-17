import { toast } from 'react-hot-toast';


export const validateRegistration = (values) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /[A-Za-z]/;

    if (!emailRegex.test(values.email)) {
        toast.error('Invalid email address');
        return false;
    }
    if (values.username && values.username.length < 4) {
        toast.error('Username must be at least 4 characters long');
        return false;
    }
    if (values.password !== values['confirm-password']) {
        toast.error('Passwords do not match');
        return false;
    }
    if (!passwordRegex.test(values.password)) {
        toast.error('Password must contain at least one letter');
        return false;
    }

    return true;
};

export const validateBillingInfo = (values) => {   
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[a-zA-Z\s]+$/; 

    if (!values.fullName) {
        toast.error('Full Name is required');
        return false;
    }
    if (!nameRegex.test(values.fullName)) {
        toast.error('Full Name should contain only letters and spaces');
        return false;
    }
    if (!phoneRegex.test(values.phone)) {
        toast.error('Invalid phone number');
        return false;
    }
    if (!values.city) {
        toast.error('City is required');
        return false;
    }
    if (!values.address) {
        toast.error('Address is required');
        return false;
    }
    if (!values.zip) {
        toast.error('ZIP Code is required');
        return false;
    }

    return true;
};