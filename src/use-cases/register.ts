import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { User, UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    
    const password_hash = await hash(password, 6)
    
    const emailExists = await this.usersRepository.findByEmail(email)
    
    if(emailExists) {
      throw new UserAlreadyExistsError()
    }
    
    const user = await this.usersRepository.create({name, email, password_hash})

    return {
      user
    }
  }
}