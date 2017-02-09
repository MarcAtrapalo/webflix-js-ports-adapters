import Order from '../../domain/model/entities/Order';

interface IOrderRepository {
    add: (order: Order) => void;
    update: (order: Order) => void;
    getCurrentOrderByCustomerName: (name: string) => Order;
    nextId: () => string;
}

export default IOrderRepository;
