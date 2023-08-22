import axios from "axios";
export const getFilesForUser = async (email: string) => {
  if (email) {
    return axios
      .get(`/api/users/getOneByEmail?email=${email}`)
      .then((resp: any) => {
        if (resp?.data?.user?.files) {
          return resp?.data?.user?.files;
        } else {
          return [];
        }
      });
  }
};
