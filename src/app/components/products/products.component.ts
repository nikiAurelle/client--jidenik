import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component(
{
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent
{

    lesProducts : any
    public forLoop: number[];
    loading: Boolean = false
    constructor(private http:HttpClient,private cookie:CookieService,private router: Router)
    {
        this.forLoop = Array.from({length: 12}, (_, i) => i + 1);
    }

    products: any[] =
    [

    ]

    ngAfterViewInit()
    {
        this.FetchProducts();
    }
    Favorite(event: any)
    {
        let user:any = this.Parse(this.cookie.get("user"));
        if(user == null)
        {
            this.router.navigate(['/login']);
            return;
        }

        let star = event.target as HTMLButtonElement;
        if(star.className.toString().includes("filled"))
        {
            star.className = "star-icon";
        }
        else
        {
            star.className = "star-filled";
        }
        var favorite =
        {
            id: star.value
        };

        if(user.favorite.includes(favorite.id))
        {
            let index = user.favorite.indexOf(favorite.id);
            user.favorite.splice(index,1);
        }
        else
        {
            user.favorite.push(favorite.id);
        }
        let jsonUser = JSON.stringify(user);
        this.cookie.set("user",jsonUser);

        this.http.post<any>(AppComponent.API_URL + "/favorite",favorite,{ withCredentials: true }).subscribe(request =>
        {
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

    public FetchProducts()
    {
        this.http.get<any>(AppComponent.API_URL + "/products").subscribe(request =>
        {
            let products = request.products;
            this.lesProducts = request.products;
            this.loading = true
          console.log(this.lesProducts)
            let user:any = this.Parse(this.cookie.get("user"));
          console.log(user)
            for (let i = 0; i < products.length; i++)
            {
                let product = products[i];
                let id = (document.getElementById("id"+i) as HTMLButtonElement);
                let id2 = (document.getElementById("2id"+i) as HTMLButtonElement);
                let name = (document.getElementById("name"+i) as HTMLTitleElement);
                let description = (document.getElementById("description"+i) as HTMLParagraphElement);
                let img = (document.getElementById("img"+i) as HTMLImageElement);
                let price = (document.getElementById("price"+i) as HTMLParagraphElement);

                id.value = product._id;
                id2.value = product._id;
                name.innerText = product.name;
                description.innerText = product.description;
                price.innerText = product.regular_price+"$";
                let cheminImage = AppComponent.BACKOFFICE_URL+"/public/images/"+product.imageUrls;
                img.src = cheminImage;

                if(user != null)
                {
                    if (user.favorite.includes(product._id))
                        {
                            id.className = "star-filled";
                        }

                    for (let i = 0; i < user.cart.length; i++)
                    {
                        if (user.cart[i]._id == product._id)
                        {
                            id2.innerText = "Retirer du panier";
                            break;
                        }
                    }
                }
            }
        },
        error =>
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem loading the page. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });
    }

    public AddToCart(event: any)
    {
        let user:any = this.Parse(this.cookie.get("user"));
        if(user == null)
        {
            this.router.navigate(['/login']);
            return;
        }

        let btn = event.target as HTMLButtonElement;
        var product =
        {
            id: btn.value
        };
        if(btn.innerText.toString().includes("Ajouter"))
        {
            btn.innerText = "Retirer du panier";
        }
        else
        {
            btn.innerText = "Ajouter au panier";
        }

        let found = false;
        for (let i = 0; i < user.cart.length; i++)
        {
            if (user.cart[i]._id == product.id)
            {
                user.cart.splice(i,1)
                found = true;
                break;
            }
        }        
        if(!found)
        {
            let newCartProduct =
            {
                _id : product.id,
                count: 1
            }
            user.cart.push(newCartProduct);
        }
        let jsonUser = JSON.stringify(user);
        this.cookie.set("user",jsonUser);


        this.http.post<any>(AppComponent.API_URL + "/addProductToCart",product,{ withCredentials: true }).subscribe(request =>
        {
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

  protected readonly AppComponent = AppComponent;
}
