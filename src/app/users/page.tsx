"use client";

import { UserForm, UserList } from "@/modules/users";

export default function Home() {
  return (
    <div>
      <h1>Users</h1>
      <UserList />
      <UserForm />
    </div>
  );
}
