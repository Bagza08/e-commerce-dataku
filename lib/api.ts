import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
});



type TTransaction = {
  id: number;
  customerId: number;
  package: string;
  price: number;
  date: string;
};




export const fetchTransactions = () =>
  API.get("/transactions").then((res) => res.data);
export const createTransaction = (data: TTransaction) =>
  API.post("/transactions", data);
export const deleteTransaction = (id: number) =>
  API.delete(`/transactions/${id}`);

export default API;
