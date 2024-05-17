import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component(
{
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent
{
    formData: FormData = new FormData();
    constructor(private http:HttpClient,private router:Router,private cookie:CookieService)
    {

    }
    onSubmit()
    {
        var formData =
        {
            username: ((document.getElementById("username") as HTMLInputElement).value),
            email: ((document.getElementById("email") as HTMLInputElement).value),
            password: ((document.getElementById("password") as HTMLInputElement).value),
            confirmPassword: ((document.getElementById("confirmPassword") as HTMLInputElement).value)
        };
        let emailValid = this.ValidateEmail();
        let passwordValid = this.ValidatePassword();
        let usernameValid = this.ValidateUsername();

        if(!emailValid||!passwordValid||!usernameValid)
        {
            return;
        }
            this.http.post<any>(AppComponent.API_URL + "/signup",formData).subscribe(request =>
            {
                if (request.success == true)
                {
                    let message =
                    {
                        text: `Votre compte à été créé avec succès`,
                        class: "success",
                    };
                    localStorage.setItem("message",JSON.stringify(message));

                    this.cookie.set("session",request.cookie);
                    this.cookie.set("user",JSON.stringify(request.user));
                    window.location.href = '/';

                }
                else
                {
                    let msg = ((document.getElementById("message"))as HTMLParagraphElement);
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

    ValidatePassword()
    {
        let password = ((document.getElementById("password") as HTMLInputElement).value)
        let confirmPassword = ((document.getElementById("confirmPassword") as HTMLInputElement).value)
        let errorPassword = (document.getElementById("errorPassword") as HTMLParagraphElement)
        let PconfirmPassword = ((document.getElementById("PerrorPassword") as HTMLInputElement)as HTMLParagraphElement)

        if(password.length == 0)
        {
            errorPassword.innerText = "Le mot de passe ne peut pas être vide.";
            return false;
        }
        else {
          errorPassword.innerText = ""
        }
        if(password != confirmPassword)
        {
            PconfirmPassword.innerText = "Les mots de passe doivent être identique.";
            return false;
        }
        if(password.length < 8)
        {
            errorPassword.innerText = "Les mot de passe doit faire au moins 8 caractères.";
            return false;
        }

        errorPassword.innerText = "";
        return true;

    }

    ValidateEmail()
    {
        let email = ((document.getElementById("email") as HTMLInputElement).value);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = ((document.getElementById("errorEmail") as HTMLParagraphElement));
        if(!regex.test(email))
        {
            error.innerText = "L'adresse courriel n'est pas valide.";
            return false;
        }
        else
        {
            error.innerText = "";
            this.http.get<any>(AppComponent.API_URL + "/emailIsAvailable/"+email).subscribe(request =>
            {
                if(!request.success)
                {
                    error.innerText = "L'adresse courriel n'est pas disponible.";
                }
            });
        }
        return true;
    }

    ValidateUsername()
    {
        let username = ((document.getElementById("username") as HTMLInputElement).value)
        let error = ((document.getElementById("errorUsername") as HTMLParagraphElement));

        if(username.length < 3)
        {
            error.innerText = "Le nom d'utilisateur doit faire au moins 3 caractères.";
            return false;
        }
        else
        {
            error.innerText = "";
            return true;
        }
    }

}
