import axios from "axios";

const FetchCategories = () => {
  return axios.get(`/api/categories`).then((res) => res.data);
};

export default FetchCategories;
