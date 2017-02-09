import Order from '../../domain/model/entities/Order';

interface IOrderRepository {
    insert: (order: Order) => void;
    update: (order: Order) => void;
    findOneByCustomerName: (name: string) => Order;
    nextId: () => string;
}

export default IOrderRepository;
