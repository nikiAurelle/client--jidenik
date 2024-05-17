import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent 
{
  formData: FormData = new FormData();
  constructor(private http: HttpClient,private cookie: CookieService) 
  {

  }
  onSubmit() 
    {
        var formData = 
        {
            email: ((document.getElementById("email") as HTMLInputElement).value),
            password: ((document.getElementById("password") as HTMLInputElement).value)
        };
            
            this.http.post<any>(AppComponent.API_URL + "/login",formData,{ withCredentials: true }).subscribe(request => 
            {
               
                if (request.success == true)
                {
                    let message = 
                    {
                        text: `Connection réussi. Bienvenue ${request.user.username}`,
                        class: "success",
                    };
                    localStorage.setItem("message",JSON.stringify(message));
                    this.cookie.set("session",request.cookie);
                    this.cookie.set("user",JSON.stringify(request.user));
                    window.location.href = '/';            
                }
                else
                {
                    let inputPassword = (document.getElementById("password") as HTMLInputElement);
                    inputPassword.value = ""
                    let msg = ((document.getElementById("errorMsg"))as HTMLParagraphElement);
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
 