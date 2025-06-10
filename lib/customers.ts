import API from "./api";

export type TCustomer = {
  id: number;
  name: string;
  no_hp: string;
  email: string;
  password: string;
};

// GET all
export const getCustomers = async () => {
  const res = await API.get("/customers");
  return res.data;
};

// CREATE
export const createCustomer = async (data: TCustomer) => {
  const res = await API.post("/customers", data);
  return res.data;
};

// UPDATE
export const updateCustomer = async (id: string, data: TCustomer) => {
  const res = await API.put(`/customers/${id}`, data);
  return res.data;
};

// DELETE
export const deleteCustomer = async (id: string) => {
  const res = await API.delete(`/customers/${id}`);
  return res.data;
};
