import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand',
      category_id: 'Category_id',
      daily_rate: 140,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'ABC 7654',
      name: 'Car_name',
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_2',
      category_id: 'Category_id',
      daily_rate: 140,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'ABC 7654',
      name: 'Car_name',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Car_brand_2' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_2',
      category_id: 'Category_id',
      daily_rate: 140,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'ABC 7654',
      name: 'Car_name_3',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car_name_3' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_2',
      category_id: 'Category_id_4',
      daily_rate: 140,
      description: 'Car_description',
      fine_amount: 100,
      license_plate: 'ABC 7654',
      name: 'Car_name_3',
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: 'Category_id_4' });
    expect(cars).toEqual([car]);
  });
});
