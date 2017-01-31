import Customer from '../../domain/model/Customer';

interface ICustomerRepository {
    add: (customer: Customer) => void;
    update: (customer: Customer) => void;
}

export default ICustomerRepository;
