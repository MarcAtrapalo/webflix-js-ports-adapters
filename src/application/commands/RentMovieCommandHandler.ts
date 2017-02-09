import IMovieRepository from '../repository-ports/IMovieRepository';
import Movie from '../../domain/model/entities/Movie';
import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';
import Rental from '../../domain/model/entities/Rental';
import Order from '../../domain/model/entities/Order';
import ApplicationException from '../ApplicationException';
import ICustomerRepository from '../repository-ports/ICustomerRepository';
import IOrderRepository from '../repository-ports/IOrderRepository';

export interface RentMovieCommand extends Command {
    title: string;
    customer: string;
    days: number;
    movieRepository: IMovieRepository;
    orderRepository: IOrderRepository;
    customerRepository: ICustomerRepository;
}

export class RentMovieCommandHandler implements CommandHandler {

    public execute(command: RentMovieCommand): void {
        const movie: Movie = command.movieRepository.getMovieByTitle(command.title);
        const rental: Rental = new Rental(movie, command.days);
        let order: Order;
        try {
            order = command.orderRepository.getCurrentOrderByCustomerName(command.customer);
            order.addRental(rental);
            command.orderRepository.update(order);
        } catch (e) {
            const customer = command.customerRepository.getByName(command.customer);
            order = new Order(command.orderRepository.nextId(), customer);
            order.addRental(rental);
            command.orderRepository.add(order);
        }
    }

}

const rentMovie = new RentMovieCommandHandler();
export default rentMovie;
