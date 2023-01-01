import axios from "axios";


axios.defaults.baseURL = "https://pixabay.com/api/"
const API_KEY = "31047925-06104412e98efcf2f7c7fbf45"

export async function pictureResp(search, page) {
    try {
        const resPicture = await (await axios.get(`?key=${API_KEY}&q=${search}&page=${page+1}&image_type=photo&orientation=horizontal&per_page=12`));
        return resPicture
    }
    catch (error) {
        console.log(error);
    }

} 