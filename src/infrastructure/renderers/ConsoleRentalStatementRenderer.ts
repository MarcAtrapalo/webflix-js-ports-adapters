import IRentalStatementRenderer, {
    IRentalStatement, IRental,
    IMoney
} from '../../application/io-ports/IRentalStatementRenderer';

export class ConsoleRentalStatementRenderer implements IRentalStatementRenderer {

    private renderPrice(price: IMoney): string {
        return Intl.NumberFormat(['en-US'], {
            style: 'decimal',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }).format(price.amount);
    }

    public render(rentalStatement: IRentalStatement): void {
        console.log(
            'Rental Record for Customer Name\n' +
            rentalStatement.rentals.map((rental: IRental) =>
                '\t' + rental.movieTitle + '\t' + this.renderPrice(rental.price)
            ) + '\n' +
            'You owed ' + this.renderPrice(rentalStatement.totalPrice) + '\n' +
            'You earned ' + rentalStatement.totalPoints + ' frequent renter points\n'
        );
    }

}

const rentalStatementRenderer = new ConsoleRentalStatementRenderer();

export default rentalStatementRenderer;
