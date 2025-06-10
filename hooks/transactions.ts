import {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  TTransactions,
} from "@/lib/transactions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTransactions = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["Transaction"],
    queryFn: getTransaction,
  });

  const create = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transaction"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TTransactions }) =>
      updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transaction"] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transaction"] });
    },
  });

  return { query, create, update, remove };
};
