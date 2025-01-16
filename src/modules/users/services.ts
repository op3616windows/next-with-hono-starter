import { AppError, CONFLICT } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { DeleteUserInput, UpdateUserInput } from "./schemas";

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (userData: { name: string; email: string }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new AppError(CONFLICT, "User with this email already exists");
  }

  return prisma.user.create({
    data: userData,
  });
};

export const updateUser = async ({
  id,
  ...userData
}: UpdateUserInput & { id: string }) => {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};

export const deleteUser = async ({ id }: DeleteUserInput) => {
  return prisma.user.delete({
    where: { id },
  });
};
