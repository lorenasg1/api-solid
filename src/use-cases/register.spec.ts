import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({ 
      name: 'test name', 
      email: 'test@email.com', 
      password: 'test_password' 
    })


    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({ 
      name: 'test name', 
      email: 'test@email.com', 
      password: 'test_password' 
    })

    const isPasswordCorrectlyHashed = await compare('test_password', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with an already registered email', async () => {
    const email = 'test@email.com'

    await sut.execute({ 
      name: 'test name', 
      email,
      password: 'test_password' 
    })

    await expect(() => sut.execute({
      name: 'test name', 
      email,
      password: 'test_password'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
