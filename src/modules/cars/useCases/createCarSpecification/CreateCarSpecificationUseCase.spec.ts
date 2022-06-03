import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });
  it('should NOT be able to add a new specification to a non existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specification_id = ['specificacao'];
      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'New car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 25,
      brand: 'Car brand',
      category_id: 'category',
    });

    const specification = await specificationRepositoryInMemory.create({
      description: 'Spec Description',
      name: 'Spec Name',
    });

    const car_id = car.id;
    const specification_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase
      .execute({ car_id, specification_id });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
