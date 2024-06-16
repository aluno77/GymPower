import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UseAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUseCase } from './register-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Registrar um Caso de Uso', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('deve ser possível se cadastar', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'test12@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  // should to hash user password upon registration
  it('deve ter um hash da senha do usuário no momento do registro ', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'test12@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  // should not be able to register with the same email
  it('No deve ser possível se cadastar com o mesmo email', async () => {
    const email = 'test12@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(async () =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UseAlreadyExistsError)
  })
})
