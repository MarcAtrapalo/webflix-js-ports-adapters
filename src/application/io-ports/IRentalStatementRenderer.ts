export interface IMoney {
    amount: number;
    currency: string;
}

export interface IRental {
    movieTitle: string;
    price: IMoney;
}

export interface IRentalStatement {
    rentals: IRental[];
    totalPrice: IMoney;
    totalPoints: number;
}

interface IRentalStatementRenderer {
    render: (rentalStatement: IRentalStatement) => void;
}

export default IRentalStatementRenderer;
