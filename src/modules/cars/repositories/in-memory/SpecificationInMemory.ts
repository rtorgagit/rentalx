import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });
    this.specications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specications.find((specification) => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specications
      .filter((specification) => ids.includes(specification.id));

    return allSpecifications;
  }
}

export { SpecificationRepositoryInMemory };
