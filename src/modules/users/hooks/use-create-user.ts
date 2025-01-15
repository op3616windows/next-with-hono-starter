import client from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserInput } from "@/modules/users/schemas";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserInput) => {
      const res = await client.api.users.$post({ json: userData });

      const data = await res.json();
      if (!data.success) throw new Error(data.error.message);

      return data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(data);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
