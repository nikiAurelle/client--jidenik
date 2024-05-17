import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import {AppComponent } from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {MainComponent} from "./components/main/main.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { TestComponent } from './components/test/test.component';
import { IndexComponent } from './components/index/index.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CategoryComponent } from './components/category/category.component';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TestComponent,
    IndexComponent,
    SignupComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    CartComponent,
    ProductsComponent,
    FavoritesComponent,
    CategoryComponent,
    PaymentComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgOptimizedImage,
        CommonModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }