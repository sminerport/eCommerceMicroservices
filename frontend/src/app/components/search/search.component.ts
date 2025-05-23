import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ProductResponse } from '../../models/product-response';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  products: ProductResponse[] = [];

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, public usersService: UsersService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var searchStr = params['str?']; // Replace with your actual parameter name
      //console.log(searchStr);
      if (!searchStr)
        searchStr = "";

      this.productsService.searchProducts(searchStr).subscribe({
        next: (response: ProductResponse[]) => {
          this.products = response;
        },
  
        error: (err) => {
          console.log(err);
        }
      });
    });
  }
}
