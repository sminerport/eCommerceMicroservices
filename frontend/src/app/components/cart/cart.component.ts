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

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, MatTableModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  displayedColumns = ['productName', 'unitPrice', 'quantity'];
  cartItemsDataSource: MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>([]);

  constructor(private cartService: CartService, public usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    //console.log(this.cartItems);
    this.cartItemsDataSource = new MatTableDataSource<CartItem>(this.cartItems);
  }

  // Function to increase quantity (handle minimum quantity)
  increaseQuantity(item: CartItem): void {
    this.cartService.addCartItem(item);
    this.cartItems = this.cartService.getCartItems();
    this.cartItemsDataSource = new MatTableDataSource<CartItem>(this.cartItems);
  }

  // Function to decrease quantity (handle minimum quantity)
  decreaseQuantity(item: CartItem): void {
    this.cartService.removeCartItem(item.productID);
    this.cartItems = this.cartService.getCartItems();
    this.cartItemsDataSource = new MatTableDataSource<CartItem>(this.cartItems);
  }

  placeOrder(): void {
    this.cartService.newOrder().subscribe({
      next: (response: OrderResponse) => {
        if (response)
          this.router.navigate(['orders']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
