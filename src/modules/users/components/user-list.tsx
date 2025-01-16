import { Button } from "@/components/ui/button";
import { useUsers } from "@/modules/users";
import { useUpdateUser } from "@/modules/users/hooks/use-update-user";
import { useDeleteUser } from "../hooks/use-delete-user";

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdateUser = (id: string) => {
    updateUser.mutate({ id, name: "Hi Jack 1" });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser.mutate({ id });
  };

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id} className="space-x-3">
          {user.name}
          <Button
            disabled={updateUser.isPending}
            onClick={() => handleUpdateUser(user.id)}
          >
            Update
          </Button>
          <Button
            disabled={deleteUser.isPending}
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
};
