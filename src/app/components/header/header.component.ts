import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from "@angular/router";
import { EntityService } from "../../services/entity.service";
import { getEntityPorperties } from "../../helpers/helpers";
import { routes } from "../../helpers/route";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent 
{

  constructor(private http:HttpClient,private cookie: CookieService) { }










    public static IsAuthentified:boolean = false;
    public user:any = this.Parse(this.cookie.get("user"));
    public isAuthentified = HeaderComponent.IsAuthentified;



    public Parse(json:any)
    {
        if(json == "")
        {
            HeaderComponent.IsAuthentified = false;
            return undefined;
        }
        else
        {
            HeaderComponent.IsAuthentified = true;
            return JSON.parse(json);
        }
    }

    public Logout()
   {
        this.http.get<any>(AppComponent.API_URL + "/logout").subscribe(request =>
        {
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            if (request.success == true)
            {
                msg.className = "success";
                msg.innerHTML = request;
            }
            else
            {
                msg.className = "error"
                msg.innerHTML = request.errors;
            }

        },
        error =>
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });
    }
}
