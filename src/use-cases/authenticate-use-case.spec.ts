import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate um Caso de Uso', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('deve ser possível autenticar', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmil.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmil.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  // should not be able to authenticate with wrong email
  it('No deve ser possível autenticar com uma e-mail que não existe', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@gmil.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  // should not be able to authenticate with wrong password
  it('No deve ser possível autenticar com uma senha que não existe', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmil.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@gmil.com',
        password: '12345698',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
