import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderResponse } from '../../models/order-response';
import { OrderItemResponse } from '../../models/order-item-response';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, MatTableModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: OrderResponse[] = [];
  displayedColumns = ['productName', 'unitPrice', 'quantity', 'itemTotal'];
  cartItemsDataSource: MatTableDataSource<CartItem>[] = [];
  isLoaded: boolean = false;

  constructor(private cartService: CartService, public usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    //console.log(this.usersService.authResponse);
    this.cartService.getOrdersByUserID(this.usersService.authResponse?.userID!)
      .subscribe({
        next: (response: OrderResponse[]) => {
          this.isLoaded = true;
          this.orders = response;
          //console.log(this.orders);

          this.orders.forEach((order: OrderResponse) => {
            var cartItemDataSource = new MatTableDataSource<CartItem>([]);
            order.orderItems.forEach((orderItem: OrderItemResponse) => {

              var cartItem: CartItem = {
                productID: orderItem.productID,
                productName: orderItem.productName,
                unitPrice: orderItem.unitPrice,
                quantity: orderItem.quantity,
                category: orderItem.category
              };

              //console.log(cartItem);

              cartItemDataSource.data.push(cartItem);
            });
            this.cartItemsDataSource.push(cartItemDataSource);
          })
        },
        error: (err) => {
          this.isLoaded = true;
          console.log(err);
        }
      });
  }
}
