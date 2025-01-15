import { useQuery } from "@tanstack/react-query";
import client from "@/client";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await client.api.users.$get();
      const data = await res.json();

      if (!data.success) throw new Error(data.error.message);

      return data.data;
    },
  });
};
