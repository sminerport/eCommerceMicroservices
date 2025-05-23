import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ProductResponse } from '../../models/product-response';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule],
  templateUrl: './show-case.component.html',
  styleUrl: './show-case.component.css'
})
export class ShowCaseComponent {
  products: ProductResponse[] = [];

  constructor(private productsService: ProductsService, public usersService: UsersService, private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response: ProductResponse[]) => {
        this.products = response;
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(product: ProductResponse): void
  {
    var cartItem: CartItem = {
      productID: product.productID,
      productName: product.productName,
      unitPrice: product.unitPrice,
      quantity: 1,
      category: product.category
    };

    this.cartService.addCartItem(cartItem);

    this.router.navigate(["/cart"]);
  }
}
