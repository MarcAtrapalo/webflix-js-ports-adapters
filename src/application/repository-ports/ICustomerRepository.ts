import Customer from '../../domain/model/Customer';

interface ICustomerRepository {
    add: (customer: Customer) => void;
    update: (customer: Customer) => void;
    getByName: (name: string) => Customer;
}

export default ICustomerRepository;
