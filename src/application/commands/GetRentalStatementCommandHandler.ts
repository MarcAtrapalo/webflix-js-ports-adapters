import CommandHandler from '../command-bus/CommandHandler';
import Command from "../command-bus/Command";
import IOrderRepository from "../repository-ports/IOrderRepository";
import Order from "../../domain/model/Order";
import Rental from "../../domain/model/Rental";
import IRentalStatementRenderer, {IRentalStatement, IRental, IMoney} from "../io-ports/IRentalStatementRenderer";
import Money from "../../domain/model/Money";

export interface GetRentalStatementCommand extends Command {
    customer: string;
    orderRepository: IOrderRepository;
    rentalStatementRenderer: IRentalStatementRenderer;
}

export class GetRentalStatementCommandHandler implements CommandHandler {

    execute(command: GetRentalStatementCommand) {
        const order: Order = command.orderRepository.getCurrentOrderByCustomerName(command.customer);
        const price = order.getTotalPrice();

        const rentalStatement: IRentalStatement = {
            rentals: order.rentalList.map(this.getRentalOutput),
            totalPrice: this.getMoneyOutput(order.getTotalPrice()),
            totalPoints: order.getTotalFrequentRenterPoints(),
        };
        command.rentalStatementRenderer.render(rentalStatement);
    }

    private getRentalOutput(rental: Rental): IRental {
        return {
            movieTitle: rental.movie.title,
            price: this.getMoneyOutput(rental.getRentalPrice()),
        }
    }

    private getMoneyOutput(money: Money): IMoney {
        return {
            amount: money.amount,
            currency: money.currency.isoCode,
        }
    }

}

const getRentalStatement = new GetRentalStatementCommandHandler();
export default getRentalStatement;
