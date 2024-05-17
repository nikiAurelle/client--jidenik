import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'test', component: TestComponent }, 
  { path: 'signup', component: SignupComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: 'cart', component: CartComponent }, 
  { path: 'products', component: ProductsComponent }, 
  { path: 'favorites', component: FavoritesComponent }, 
  { path: '**', redirectTo: '/' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, TestComponent]
