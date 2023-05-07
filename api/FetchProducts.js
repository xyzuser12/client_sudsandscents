import axios from "axios";

const FetchProducts = () => {
  return axios.get(`/api/products`).then((res) => res.data);
};

export default FetchProducts;
