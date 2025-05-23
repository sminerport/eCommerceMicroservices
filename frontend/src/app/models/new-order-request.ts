import { NewOrderItemRequest } from "./new-order-item-request";

export interface NewOrderRequest {
    userID: string;
    orderDate: Date;
    orderItems: NewOrderItemRequest[];
}
