import IOrderRepository from '../../application/repository-ports/IOrderRepository';
import Order from '../../domain/model/Order';
import InfrastructureException from '../InfrastructureException';
import shortid from 'shortid';

export default class InMemoryOrderRepository implements IOrderRepository {
    private orders: Order[];

    constructor() {
        this.orders = [];
    }

    private hasCustomer(customerName: string): (order: Order) => boolean {
        return (order: Order): boolean => {
            return order.customer.name === customerName;
        };
    }

    private hasId(id: string): (order: Order) => boolean {
        return (order: Order): boolean => {
            return order.id === id;
        };
    }

    public add(order: Order): void {
        const order = this.orders.find(this.hasCustomer(name));
        if (typeof order !== 'undefined') {
            throw new InfrastructureException('Order already exists');
        }
        this.orders.unshift(order);
    }

    public getCurrentOrderByCustomerName(name: string): Order {
        const order = this.orders.find(this.hasCustomer(name));
        if (typeof order === 'undefined') {
            throw new InfrastructureException('Order not found');
        }
        return order;
    }

    public update(order: Order): void {
        let found = false;
        this.orders = this.orders.map((old: Order): Order => {
            if (this.hasId(order.id)(old)) {
                found = true;
                return order;
            }
            return old;
        });
        if (!found) {
            throw new InfrastructureException('Order does not exist');
        }
    }

    public nextId(): string {
        return shortid.generate();
    }

}
