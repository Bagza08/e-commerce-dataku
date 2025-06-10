import API from "./api";

export type TTransactions = {
  id: number;
  customerId: number;
  name: string;
  package: string;
  price: number;
  date: string;
};

// GET all
export const getTransaction = async () => {
  const res = await API.get("/transactions");
  return res.data;
};

// CREATE
export const createTransaction = async (data: TTransactions) => {
  const res = await API.post("/transactions", data);
  return res.data;
};

// UPDATE
export const updateTransaction = async (id: string, data: TTransactions) => {
  const res = await API.put(`/transactions/${id}`, data);
  return res.data;
};

// DELETE
export const deleteTransaction = async (id: string) => {
  const res = await API.delete(`/transactions/${id}`);
  return res.data;
};
