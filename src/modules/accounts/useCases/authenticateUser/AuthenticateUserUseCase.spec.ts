import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUsecase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUsecase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0012345',
      email: 'user@teste.com',
      password: '1234',
      name: 'John Doe',
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUsecase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an non existent user', () => {
    expect(async () => {
      await authenticateUserUsecase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorret password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '999999',
        email: 'user@teste.com',
        password: '1234',
        name: 'John Doe',
      };
      await createUserUseCase.execute(user);
      await authenticateUserUsecase.execute({
        email: user.email,
        password: '1111',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
