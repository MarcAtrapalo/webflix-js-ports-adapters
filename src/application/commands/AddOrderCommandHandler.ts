import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';
import Customer from '../../domain/model/Customer';
import ICustomerRepository from '../repository-ports/ICustomerRepository';
import IOrderRepository from '../repository-ports/IOrderRepository';
import Order from '../../domain/model/Order';

export interface AddCustomerCommand extends Command {
    customer: string;
    customerRepository: ICustomerRepository;
    orderRepository: IOrderRepository;
}

export default class AddCustomerCommandHandler implements CommandHandler {

    public execute(command: AddCustomerCommand): void {
        const customer: Customer = command.customerRepository.getByName(command.customer);
        const order = new Order(customer);
        command.orderRepository.add(order);
    }

}
