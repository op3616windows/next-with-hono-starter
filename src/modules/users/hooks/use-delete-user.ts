import client from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUserInput } from "@/modules/users/schemas";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: DeleteUserInput) => {
      const res = await client.api.users.$delete({ json: userData });

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
