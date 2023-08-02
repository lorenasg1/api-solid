import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate an user', async () => {
    await usersRepository.create({
      name: 'test name',
      email: 'test@email.com',
      password_hash: await hash('test_password', 6)
    })

    const { user } = await sut.execute({ 
      email: 'test@email.com', 
      password: 'test_password' 
    })


    expect(user).toEqual(user)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() => sut.execute({
      email: 'test@email.com', 
      password: 'test_password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
