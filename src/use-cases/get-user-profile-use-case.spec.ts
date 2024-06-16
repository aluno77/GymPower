import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Buscar perfil de um usuario no Caso de Uso', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })
  // should be able to get user profile
  it('deve ser possível obter ou perfil do usuario', async () => {
    const createUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmil.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })
  // should not be able to get user profile with wrong id
  it('No deve ser possível trazer ou id de um usuário com id diferente', async () => {
    await expect(async () =>
      sut.execute({
        userId: 'no-exists-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
