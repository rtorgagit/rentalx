import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const todayPlus24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: todayPlus24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental to a user that has other openned rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user1',
        car_id: '121212',
        expected_return_date: todayPlus24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'user1',
        car_id: '343434',
        expected_return_date: todayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental to a car that has other openned rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12111',
        car_id: 'car1',
        expected_return_date: todayPlus24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'car1',
        expected_return_date: todayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12111',
        car_id: 'car1',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
