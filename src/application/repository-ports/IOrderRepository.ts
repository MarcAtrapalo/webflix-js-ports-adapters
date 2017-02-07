import Order from '../../domain/model/Order';

interface IOrderRepository {
    add: (order: Order) => void;
    update: (order: Order) => void;
    getCurrentOrderByCustomerName: (name: string) => Order;
    nextId: () => string;
}

export default IOrderRepository;
