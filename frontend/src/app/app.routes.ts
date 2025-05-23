import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShowCaseComponent } from './components/show-case/show-case.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

export const routes: Routes = [
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'products/showcase', component: ShowCaseComponent },
    { path: 'products/search/:str?', component: SearchComponent },
    { path: 'products/search', component: SearchComponent },
    { path: 'admin/products', component: ProductsComponent },
    { path: 'products/edit/:productID', component: EditProductComponent },
    { path: 'products/delete/:productID', component: DeleteProductComponent },
    { path: 'products/create', component: NewProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'admin/orders', component: AdminOrdersComponent },
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
