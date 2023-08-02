import { prisma } from "@/lib/prisma";
import { CreateUserDto, User, UsersRepository } from "./users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create (data: CreateUserDto): Promise<User> {
    return prisma.user.create({ data })
  }

  async findByEmail (email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } }) 
  }
}