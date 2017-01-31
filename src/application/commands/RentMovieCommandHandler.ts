import IMovieRepository from '../repository-ports/IMovieRepository';
import Movie from '../../domain/model/Movie';
import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';
import Rental from '../../domain/model/Rental';
import Order from '../../domain/model/Order';
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

export default class RentMovieCommandHandler implements CommandHandler {

    public execute(command: RentMovieCommand): void {
        const movie: Movie = command.movieRepository.getMovieByTitle(command.title);
        let order: Order;
        try {
            order = command.orderRepository.getCurrentOrderByCustomerName(command.customer);
        } catch (e) {
            throw new ApplicationException('The customer has no open orders');
        }
        const rental: Rental = new Rental(movie, command.days);
        order.addRental(rental);
        command.orderRepository.update(order);
    }

}
