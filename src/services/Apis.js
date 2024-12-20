import axios from 'axios';

const MasterServletApiCollection = {
    verifyUrl: async (url, token) => {
        if (!url || url.length < 1) {
            return false;
        }

        try {
            // const resp = await axios.get(`${url}/version`);
            const resp = await MasterServletApiCollection.getAll(url, token)
            return resp.status === 200;
        } catch {
            return false;
        }
    },
    getAll: (url, token) => {
        return axios.get(`${url}/server/setting/dispatcher`, { headers: { Authorization: `Bearer ${token}` } });
    },
    insert: (url, token, data) => {
        return axios.post(`${url}/server/setting/dispatcher`, data, { headers: { Authorization: `Bearer ${token}` } });
    },
    update: (url, token, data) => {
        return axios.patch(`${url}/server/setting/dispatcher`, data, { headers: { Authorization: `Bearer ${token}` } });
    },
    delete: (url, token, mac) => {
        return axios.delete(`${url}/server/setting/dispatcher`, { params: { dvrMac: mac }, headers: { Authorization: `Bearer ${token}` } })
    },
    refresh: (url, token) => {
        return axios.get(`${url}/server/setting/reload`, { headers: { Authorization: `Bearer ${token}` } });
    }
};

export default MasterServletApiCollection;
