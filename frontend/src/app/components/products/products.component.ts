import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../models/product-response';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule, MatTableModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: ProductResponse[] = [];
  displayedColumns: string[] = ['productName', 'category', 'unitPrice', 'quantityInStock', 'actions'];

  constructor(private productsService: ProductsService, public usersService: UsersService, private router: Router) {
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

  edit(product : ProductResponse) : void
  {
    this.router.navigate(['/products', 'edit', product.productID]);
  }

  delete(product : ProductResponse) : void
  {
    this.router.navigate(['/products', 'delete', product.productID]);
  }
}
