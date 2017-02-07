import {RentMovieCommand} from '../../application/commands/RentMovieCommandHandler';
import {GetRentalStatementCommand} from '../../application/commands/GetRentalStatementCommandHandler';
import InMemoryMovieRepository from '../repositories/InMemoryMovieRepository';
import InMemoryOrderRepository from '../repositories/InMemoryOrderRepository';
import InMemoryCustomerRepository from '../repositories/InMemoryCustomerRepository';
import CommandBus from '../../application/command-bus/CommandBus';
import ConsoleRentalStatementRenderer from '../renderers/ConsoleRentalStatementRenderer';

export interface IAddRentalRequest {
    customerName: string;
    movieTitle: string;
    rentalDuration: number;
}

export interface IPrintRentalStatement {
    customerName: string;
}

class RentalController {

    public addRental(request: IAddRentalRequest) {
        const command: RentMovieCommand = {
            meta: {
                commandType: 'RentMovie',
            },
            title: request.movieTitle,
            customer: request.customerName,
            days: request.rentalDuration,
            movieRepository: InMemoryMovieRepository,
            orderRepository: InMemoryOrderRepository,
            customerRepository: InMemoryCustomerRepository,
        };

        CommandBus.execute(command);
    }

    public printRentalStatement(request: IPrintRentalStatement): string {
        const command: GetRentalStatementCommand = {
            meta: {
                commandType: 'GetRentalStatement',
            },
            customer: request.customerName,
            orderRepository: InMemoryOrderRepository,
            rentalStatementRenderer: ConsoleRentalStatementRenderer,
        };

        CommandBus.execute(command);
    }
}

export default RentalController;
