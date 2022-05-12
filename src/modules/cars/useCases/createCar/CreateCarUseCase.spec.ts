import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'New car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 25,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car.id).toHaveProperty('id');
  });

  it('should not be able to create two cars with the same license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'New car',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-4567',
        fine_amount: 25,
        brand: 'Car brand',
        category_id: 'category',
      });
      await createCarUseCase.execute({
        name: 'New car',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-4567',
        fine_amount: 25,
        brand: 'Car brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'New car available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABD-4567',
      fine_amount: 25,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
