import axios from "axios";
import SessionStore from "@/common/session_store";
import Settings from "@/common/settings";

class MediaService {

    static uploadFile(fileToUpload, bucket) {
        let formData = new FormData();
        formData.append("file", fileToUpload);

        let token = SessionStore.GetAccessToken();

        let queryUrl = Settings.GetApiUrl() + "/fs/" + bucket;

        return axios.post(queryUrl, formData, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data",
            },
        }).then(resp => resp.data).catch(err => console.log(err));
    }
}

export default MediaService;
