import * as request from "../lib/request";

const baseUrl = "data/billingInfo";


export const getOne = async (billingId) => {
    const result = await request.get(`${baseUrl}/${billingId}`);

    return result;
};

export const create = async (billingData) => {
    const result = await request.post(baseUrl, billingData);
    return result;
};

export const edit = async (billingId, billingData) => {
    const result = await request.put(`${baseUrl}/${billingId}`, billingData);

    return result;
};

export const getMyBillingInfo = async (userId) => {
    try {

        const allBillingRecords = await request.get(baseUrl);
        
        const userBillingRecord = allBillingRecords.find(record => record._ownerId === userId);

        return userBillingRecord || null;
    } catch (error) {
        throw error;
    }
};