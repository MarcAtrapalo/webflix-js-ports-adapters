import InMemoryCustomerRepository from '../../infrastructure/repositories/InMemoryCustomerRepository';
import {AddCustomerCommand} from '../../application/commands/AddCustomerCommandHandler';
import CommandBus from '../../application/command-bus/CommandBus';

export interface IAddCustomerRequest {
    name: string;
}

export default class CustomerController {

    addCustomer(request: IAddCustomerRequest) {
        const command: AddCustomerCommand = {
            meta: {
                commandType: 'AddCustomer',
            },
            name: request.name,
            customerRepository: InMemoryCustomerRepository,
        };

        CommandBus.execute(command);
    }

}
