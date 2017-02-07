import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';
import Customer from '../../domain/model/Customer';
import ICustomerRepository from '../repository-ports/ICustomerRepository';

export interface AddCustomerCommand extends Command {
    name: string;
    customerRepository: ICustomerRepository;
}

export class AddCustomerCommandHandler implements CommandHandler {

    public execute(command: AddCustomerCommand): void {
        const customer = new Customer(command.name);
        command.customerRepository.add(customer);
    }

}

const addCustomer = new AddCustomerCommandHandler();
export default addCustomer;
