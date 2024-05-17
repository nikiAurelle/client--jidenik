import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import {render} from 'creditcardpayments/creditCardPayments'

@Component(
{
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent
{
    cart:any[] = [];
    constructor(private http:HttpClient,private cookie:CookieService)
    {
        this.http.get<any>(AppComponent.API_URL + "/priceCart",{ withCredentials: true }).subscribe(request =>
        {
            let paypalDiv = document.getElementById("myPaypalButtons") as HTMLDivElement;
            paypalDiv.innerHTML = ""
            render(
            {
                id:"#myPaypalButtons",
                currency:"CAD",
                value:request.price.toString(),
                onApprove: (details) =>
                {
                    alert("Transaction successful");
                } 
            });
            console.log(request.errors);
        },
        error =>
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });
    }
    ngOnInit()
    {
        this.cart = this.Parse(this.cookie.get('user')).cart;

        this.http.get<any>(AppComponent.API_URL + "/getCart",{ withCredentials: true }).subscribe(request =>
        {
            let cartProducts = request.cart;
            for (let i = 0; i < request.cart.length; i++)
            {
                let product = cartProducts[i];
                let id = (document.getElementById("id"+i) as HTMLInputElement);
                let name = (document.getElementById("name"+i) as HTMLTitleElement);
                let description = (document.getElementById("description"+i) as HTMLParagraphElement);
                let img = (document.getElementById("img"+i) as HTMLImageElement);
                let price = (document.getElementById("price"+i) as HTMLParagraphElement);
                id.value = product._id;
                name.innerText = product.name;
                description.innerText = product.description;
                price.innerText = product.regular_price+"$";
                let cheminImage = AppComponent.BACKOFFICE_URL+"/public/images/"+product.imageUrls;
                img.src = cheminImage;
            }
            console.log(request.errors);
        },
        error =>
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });
    }

    public Increment(event: any)
    {
        let idProduct = (event.target as HTMLButtonElement).id;
        let counter = ((document.getElementById(idProduct+"counter") as HTMLSpanElement));
        this.ChangeCount(idProduct,1,counter);
    }

    public Decrement(event: any)
    {
        let idProduct = (event.target as HTMLButtonElement).id;
        let counter = ((document.getElementById(idProduct+"counter") as HTMLSpanElement));
        this.ChangeCount(idProduct,-1,counter);
    }

    private ChangeCount(id:any,add:number,htmlContainer:HTMLSpanElement)
    {
        let paypalDiv = document.getElementById("myPaypalButtons") as HTMLDivElement;
        let user = this.Parse(this.cookie.get('user'));
        if(user == undefined)
        {
            return;
        }
        for (let i = 0; i < user.cart.length; i++)
        {
            if (user.cart[i]._id == id)
            {
                user.cart[i].count += add;
                if(user.cart[i].count <= 0)
                {
                    this.DeleteFromCart(id);
                    user.cart.splice(i,1)
                }
                else
                {
                    let body =
                    {
                        id : id,
                        count: user.cart[i].count
                    }
                    this.http.post<any>(AppComponent.API_URL + "/changeCountCart",body,{ withCredentials: true }).subscribe(request =>
                    { 
                        this.http.get<any>(AppComponent.API_URL + "/priceCart",{ withCredentials: true }).subscribe(request2 =>
                        {
                            paypalDiv.innerHTML = ""
                            render(
                            {
                                id:"#myPaypalButtons",
                                currency:"CAD",
                                value:request2.price.toString(),
                                onApprove: (details) =>
                                {
                                    alert("Transaction successful");
                                } 
                            });
                        })
                    },
                    error =>
                    {
                        console.error("Une erreur s'est produite lors de la requête HTTP :", error);
                        var msg = ((document.getElementById("message"))as HTMLParagraphElement);
                        msg.className = "error"
                        msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
                    });
                }
                let jsonUser = JSON.stringify(user);
                this.cookie.set("user",jsonUser);
                htmlContainer.innerText = user.cart[i].count;
                break;
            }
        }    
    }


    private DeleteFromCart(id:any)
    {
        let div = ((document.getElementById(id+"div") as HTMLDivElement));
        div.remove();
        var product =
        {
            id: id
        };
        this.http.post<any>(AppComponent.API_URL + "/addProductToCart",product,{ withCredentials: true }).subscribe(request =>
        {
            this.http.get<any>(AppComponent.API_URL + "/priceCart",{ withCredentials: true }).subscribe(request2 =>
                {
                    let paypalDiv = document.getElementById("myPaypalButtons") as HTMLDivElement;
                    paypalDiv.innerHTML = ""
                    render(
                    {
                        id:"#myPaypalButtons",
                        currency:"CAD",
                        value:request2.price.toString(),
                        onApprove: (details) =>
                        {
                            alert("Transaction successful");
                        } 
                    });
                })
        },
        error =>
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });
    }

    public Parse(json:any)
    {
        if(json == "")
        {
            return undefined;
        }
        else
        {
            return JSON.parse(json);
        }
    }
}
