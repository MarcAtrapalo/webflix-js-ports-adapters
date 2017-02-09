import Customer from '../../domain/model/entities/Customer';

interface ICustomerRepository {
    insert: (customer: Customer) => void;
    update: (customer: Customer) => void;
    findOneByName: (name: string) => Customer;
}

export default ICustomerRepository;
