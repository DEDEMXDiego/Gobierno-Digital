import Axios from "axios";

const axios = Axios.create({
});

export const apiDex = (method, service, body) => {
    switch (method) {
        case "GET":
            let url = `${service}`;
            return axios.get(url).then((r) => {
                return response(r)
            }).catch((err) => {
                return response(err.response);
            });            

        default:
            break;
    }

}

const response = (r) => {

    if (r === undefined) {
        return false;
    }

    if (r.status === 401) {
        
    }

    if (r.status === 200) {
        return { status: r.status, data: r.data }
    }

    return { status: r.status, errors: r.data.error }
} 