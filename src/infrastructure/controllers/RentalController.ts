import {RentMovieCommand} from '../../application/commands/RentMovieCommandHandler';
import {InMemoryMovieRepository} from "../../../lib/infrastructure/repositories/InMemoryMovieRepository";
import InMemoryOrderRepository from "../repositories/InMemoryOrderRepository";
import InMemoryCustomerRepository from "../repositories/InMemoryCustomerRepository";
import CommandBus from "../../application/command-bus/CommandBus";

export interface IAddRentalRequest {
    customerName: string;
    movieTitle: string;
    rentalDuration: number;
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
}

export default RentalController;
