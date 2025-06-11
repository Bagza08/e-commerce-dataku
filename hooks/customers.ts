import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  TCustomer,
} from "@/lib/customers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const create = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TCustomer }) =>
      updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { query, create, update, remove };
};
