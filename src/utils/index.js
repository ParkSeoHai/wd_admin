import axios from "axios";

const URL_API = "http://localhost:3000";

function formatter(price) {
    // Format currency
    const formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return formatVND.format(price);
}

// func get params url
const getParamsPage = (params = []) => {
    const url = new URL(window.location);
    let data = {};
    for (const p of params) {
        const value = url.searchParams.get(p);
        if (value) data[p] = url.searchParams.get(p);
    }
    return data;
};

// get list data table
const getDataTable = async ({ collection, columns = [], searchQuery, page = 1, size = 15 }) => {
    try {
        const columnsNew = columns.map((item) => item.field);
        const response = await axios.post(`${URL_API}/api/v1/${collection}/crud/getAll`, {
            columns: columnsNew, size, page, searchQuery
        });
        console.log(response.data);
        if (response.data.status !== 200) {
            throw Error(response.data.message);
        }
        return {
            msg: response.data.message,
            data: response.data.metadata.data,
            options: response.data.options
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const addOrUpdateDocument = async ({ collection, data, action }) => {
    try {
        const response = await axios.post(`${URL_API}/api/v1/${collection}/crud/addOrUpdate`, {
            data, action
        });
        if (response.data.status !== 201) {
            throw Error(response.data.message);
        }
        return response.data.metadata;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getDocById = async ({ collection, id }) => {
    try {
        const response = await axios.get(`${URL_API}/api/v1/${collection}/crud/getById/${id}`);
        if (response.data.status !== 200) {
            throw Error(response.data.message);
        }
        return response.data.metadata;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const deleteDocById = async ({ collection, id }) => {
    try {
        const response = await axios.post(`${URL_API}/api/v1/${collection}/crud/deleteById`, {
            id
        });
        if (response.data.status !== 200) {
            throw Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getAllCategories = async ({ collection }) => {
    try {
        const response = await axios.get(`${URL_API}/api/v1/${collection}/getAllCategories`);
        if (response.data.status !== 200) {
            throw Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export {
    getDataTable, formatter, getParamsPage, addOrUpdateDocument,
    getDocById, deleteDocById, getAllCategories
};