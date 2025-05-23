import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../services/products.service';
import { ProductResponse } from '../../models/product-response';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, MatCardModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  deleteProductForm: FormGroup;

  constructor(private fb: FormBuilder, public usersService: UsersService, private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.deleteProductForm = this.fb.group({
      productID: [{ value: '', disabled: true }],
      productName: [{ value: '', disabled: true }],
      category: [{ value: '', disabled: true }],
      unitPrice: [{ value: '', disabled: true }],
      quantityInStock: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var productID = params['productID']; // Replace with your actual parameter name

      this.productsService.getProductByProductID(productID).subscribe({
        next: (response: ProductResponse) => {
          this.deleteProductForm.setValue({
            productID: response.productID,
            productName: response.productName,
            category: response.category,
            unitPrice: response.unitPrice,
            quantityInStock: response.quantityInStock
          });
        },

        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  delete(): void {
    const deleteProduct = this.deleteProductForm.value;
    this.productsService.deleteProduct(deleteProduct.productID).subscribe({
      next: (response: boolean) => {
        if (response)
          this.router.navigate(['admin', 'products']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  get productIDFormControl(): FormControl {
    return this.deleteProductForm.get('productID') as FormControl;
  }

  get productNameFormControl(): FormControl {
    return this.deleteProductForm.get('productName') as FormControl;
  }

  get categoryFormControl(): FormControl {
    return this.deleteProductForm.get('category') as FormControl;
  }

  get unitPriceFormControl(): FormControl {
    return this.deleteProductForm.get('unitPrice') as FormControl;
  }

  get quantityInStockFormControl(): FormControl {
    return this.deleteProductForm.get('quantityInStock') as FormControl;
  }
}
