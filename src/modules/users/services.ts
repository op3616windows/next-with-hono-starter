import { AppError, CONFLICT } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

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
