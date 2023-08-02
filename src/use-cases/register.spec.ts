import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should be able to register an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({ 
      name: 'test name', 
      email: 'test@email.com', 
      password: 'test_password' 
    })


    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({ 
      name: 'test name', 
      email: 'test@email.com', 
      password: 'test_password' 
    })

    const isPasswordCorrectlyHashed = await compare('test_password', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with an already registered email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'test@email.com'

    await registerUseCase.execute({ 
      name: 'test name', 
      email,
      password: 'test_password' 
    })

    await expect(() => registerUseCase.execute({
      name: 'test name', 
      email,
      password: 'test_password'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
