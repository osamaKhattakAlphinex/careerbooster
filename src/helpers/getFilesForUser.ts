import axios from "axios";
export const getFilesForUser = async (email: string) => {
  if (email) {
    return axios
      .get(`/api/users/getOneByEmail?email=${email}`)
      .then(async (resp: any) => {
        const response = await resp.json();
        const data = response.result;
        if (data?.files) {
          return data?.files;
        } else {
          return [];
        }
      });
  }
};
