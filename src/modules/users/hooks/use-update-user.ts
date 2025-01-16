import client from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserInput } from "@/modules/users/schemas";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: UpdateUserInput) => {
      const res = await client.api.users.$put({ json: userData });

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
