import { useCreateUser } from "@/modules/users";

export const UserForm = () => {
  const createUser = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate({ name: "Joe", email: "john@example.com" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Create User</button>
    </form>
  );
};
