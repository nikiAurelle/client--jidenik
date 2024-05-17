import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';


@Component(
{
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent 
{
    favorites:any[] = [];
    constructor(private http:HttpClient,private cookie:CookieService)
    {
      
    }
    ngOnInit() 
    {
        this.favorites = this.Parse(this.cookie.get('user')).favorite;

        this.http.get<any>(AppComponent.API_URL + "/getFavorites",{ withCredentials: true }).subscribe(request => 
        {        
            let favs = request.favorites;
            let user:any = this.Parse(this.cookie.get("user"));
            for (let i = 0; i < request.favorites.length; i++) 
            {
                let product = favs[i];
                let id = (document.getElementById("id"+i) as HTMLButtonElement);
                let id2 = (document.getElementById("2id"+i) as HTMLButtonElement);
                let name = (document.getElementById("name"+i) as HTMLTitleElement);
                let description = (document.getElementById("description"+i) as HTMLParagraphElement);
                let img = (document.getElementById("img"+i) as HTMLImageElement);
                let price = (document.getElementById("price"+i) as HTMLParagraphElement); 
                id.value = product._id;
                name.innerText = product.name;
                description.innerText = product.description;
                price.innerText = product.regular_price+"$";
                id2.value = product._id;
                let cheminImage = AppComponent.BACKOFFICE_URL+"/public/images/"+product.imageUrls;
                img.src = cheminImage;           
                for (let i = 0; i < user.cart.length; i++) 
                {
                    if (user.cart[i]._id == product._id) 
                    {
                        id2.innerText = "Retirer du panier";
                        break;
                    }
                }
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
    Favorite(event: any) 
    {
        let star = event.target as HTMLButtonElement
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
        let user:any = this.Parse(this.cookie.get("user"));
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
    
    public AddToCart(event: any) 
    {
        let user:any = this.Parse(this.cookie.get("user"));

        let btn = event.target as HTMLButtonElement;
        
        if(btn.innerText.toString().includes("Ajouter"))
        {
            btn.innerText = "Retirer du panier";
        }
        else
        {
            btn.innerText = "Ajouter au panier";
        }
        
        var product = 
        {
            id: btn.value
        }; 

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

}
