import {request as axios} from "./request"

// GET

export const getSearchList = async (param: {}) => {
  try {
    const { data } = await axios.get("convenience/search", { params: param });
    if (data.flag) {
        // console.log(data)
      return data.data.content;
    } else return false;
  } catch (error) {
    // console.log(error);
  }
};
