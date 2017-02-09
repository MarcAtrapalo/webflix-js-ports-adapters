import ICustomerRepository from '../../application/repository-ports/ICustomerRepository';
import Customer from '../../domain/model/entities/Customer';
import InfrastructureException from '../InfrastructureException';

export class InMemoryCustomerRepository implements ICustomerRepository {
    private customers: Customer[];

    constructor() {
        this.customers = [];
    }

    private getCustomersByName(name: string) {
        return this.customers.filter((customer: Customer) => (customer.name === name));
    }

    public add(customer: Customer): void {
        if (this.getCustomersByName(customer.name).length > 0) {
            throw new InfrastructureException('Customer already exists');
        }
        this.customers.push(customer);
    }

    public getByName(name: string): Customer {
        return this.getCustomersByName(name)[0];
    }

    public update(customer: Customer): void {
        let customersWithSameName = this.getCustomersByName(customer.name);
        if (customersWithSameName.length === 0) {
            throw new InfrastructureException('Customer does not exist');
        }
        this.customers = [...this.customers.filter((c) => (c.name !== customer.name)), customer];
    }

}

const customerRepository = new InMemoryCustomerRepository();

export default customerRepository;
