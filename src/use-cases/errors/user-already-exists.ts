export class UseAlreadyExistsError extends Error {
  constructor() {
    super('User with same email already exists')
  }
}
