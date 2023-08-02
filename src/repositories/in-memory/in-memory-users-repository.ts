import { CreateUserDto, User, UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];
  
  async create(data: CreateUserDto): Promise<User> {
    const user = {
      id: 'user-test',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user);

    return user   
  }

  async findByEmail(email: string): Promise<User | null> {
    const user =  this.users.find(user => user.email === email);

    if(!user) return null;

    return user
  }

}
