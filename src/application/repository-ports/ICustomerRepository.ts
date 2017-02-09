import Customer from '../../domain/model/entities/Customer';

interface ICustomerRepository {
    add: (customer: Customer) => void;
    update: (customer: Customer) => void;
    getByName: (name: string) => Customer;
}

export default ICustomerRepository;
