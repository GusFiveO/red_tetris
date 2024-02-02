import axios from "axios";

export const getAccessToken = async (api_url: string, code: string | null) => {
    const option = {
        headers: {
            'Authorization': code
        }
    };
    try {
        const response = await axios.post(api_url, option);
        console.log("lol");
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
