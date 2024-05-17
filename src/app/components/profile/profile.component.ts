import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AppComponent } from 'src/app/app.component';
import {HttpClient} from '@angular/common/http';

@Component(
{
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent 
{
    public isAuthentified = HeaderComponent.IsAuthentified;
    public user:any = this.Parse(this.cookie.get("user"));
    constructor(private cookie: CookieService,private http: HttpClient)
    {       
       
    }


    public Parse(json:any)
    {
        if(json == "")
        {
            this.user = undefined;
        }
        else
        {
            return JSON.parse(json);
        }
    }
    
    public Logout()
    {
        this.cookie.delete("user");
        this.cookie.delete("session");
        let message = 
        {
            text: `Déconnexion réussi`,
            class: "success",
        };
        localStorage.setItem("message",JSON.stringify(message));
        window.location.href = '/';  
    }
    public DisplayDelete()
    {
        let divDelete = ((document.getElementById("confirmDelete") as HTMLDivElement));
        divDelete.hidden = false;
    }

    public HideDelete()
    {
        let divDelete = ((document.getElementById("confirmDelete") as HTMLDivElement));
        divDelete.hidden = true;
    }

    public DeleteAccount()
    {
        let confirmation = ((document.getElementById("confirmationDelete") as HTMLInputElement));
        if(confirmation.value != "CONFIRMER")
        {
            return;
        }

        this.http.delete<any>(AppComponent.API_URL + "/deleteAccount",{ withCredentials: true }).subscribe(request => 
        {
            this.cookie.delete("user");
            this.cookie.delete("session");
            let message = 
            {
                text: `Votre compte a été supprimer`,
                class: "success",
            };
            localStorage.setItem("message",JSON.stringify(message));
            window.location.href = '/';  
        },
        error => 
        {
            console.error("Une erreur s'est produite lors de la requête HTTP :", error);
            var msg = ((document.getElementById("message"))as HTMLParagraphElement);
            msg.className = "error"
            msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
        });

        
        
    }



    ChangeUsername() 
    {
        let username = ((document.getElementById("username") as HTMLInputElement));
        let txtUsername = ((document.getElementById("txtUsername") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnUsernameSave = ((document.getElementById("btnUsernameSave") as HTMLButtonElement));  
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));   
        btnUsername.hidden = true;
        btnUsernameSave.hidden = false;
        btnEmail.className = "btn btn-secondary";
        btnEmail.disabled = true;
        btnAddress.className = "btn btn-secondary";
        btnAddress.disabled = true;
        txtUsername.hidden = true;
        username.hidden = false;

    }

    SaveUsername() 
    {
        let username = ((document.getElementById("username") as HTMLInputElement));
        let txtUsername = ((document.getElementById("txtUsername") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnUsernameSave = ((document.getElementById("btnUsernameSave") as HTMLButtonElement));  
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));   
        if(btnUsernameSave.className.toString().includes("loading"))
        {
            return;
        }
        let formData =
        {
            username:username.value
        };
        if(this.user.username != formData.username)
        {
            btnUsernameSave.className += " loading";
            this.http.post<any>(AppComponent.API_URL + "/changeUsername",formData,{ withCredentials: true }).subscribe(request => 
                {
                    ResetForm();
                    if (request.success == true)
                    {
                        this.user.username = formData.username;
                        this.cookie.set("user",JSON.stringify(this.user));
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
                    ResetForm();
                    console.error("Une erreur s'est produite lors de la requête HTTP :", error);
                    var msg = ((document.getElementById("message"))as HTMLParagraphElement);
                    msg.className = "error"
                    msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
                });
        }
        else
        {
            ResetForm();
        }

        function ResetForm()
        {
            btnUsername.hidden = false;
            btnUsernameSave.hidden = true;
            txtUsername.innerText = username.value;
            btnUsernameSave.className = "btn btn-primary";
            btnEmail.className = "btn btn-primary";
            btnEmail.disabled = false;
            btnAddress.className = "btn btn-primary";
            btnAddress.disabled = false;
            txtUsername.hidden = false;
            username.hidden = true;
        }
    }

    ValidationUsername(event: any)
    {
        let error = ((document.getElementById("usernameError") as HTMLParagraphElement));
        let btnUsernameSave = ((document.getElementById("btnUsernameSave") as HTMLButtonElement));
        if(event.target.value.length < 3)
        {
            error.innerText = "Le nom d'utilisateur doit faire au moins 3 caractères.";
            btnUsernameSave.disabled = true;
        }
        else
        {
            error.innerText = "";
            btnUsernameSave.disabled = false;
        }      
    }

    ChangeEmail() 
    {
        let email = ((document.getElementById("email") as HTMLInputElement));
        let txtEmail = ((document.getElementById("txtEmail") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnEmailSave = ((document.getElementById("btnEmailSave") as HTMLButtonElement));  
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));   
        btnEmail.hidden = true;
        btnEmailSave.hidden = false;
        btnUsername.className = "btn btn-secondary";
        btnUsername.disabled = true;
        btnAddress.className = "btn btn-secondary";
        btnAddress.disabled = true;
        txtEmail.hidden = true;
        email.hidden = false;
    }

    SaveEmail()
    {
        let email = ((document.getElementById("email") as HTMLInputElement));
        let txtEmail = ((document.getElementById("txtEmail") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));  
        let btnEmailSave = ((document.getElementById("btnEmailSave") as HTMLButtonElement));  
        if(btnEmailSave.className.toString().includes("loading"))
        {
            return;
        }

        let formData =
        {
            email:email.value
        };
        if(this.user.email != formData.email)
        {
           btnEmailSave.className += " loading"; 
            this.http.post<any>(AppComponent.API_URL + "/changeEmail",formData,{ withCredentials: true }).subscribe(request => 
            {
                ResetForm();
                if (request.success == true)
                {
                    this.user.email = formData.email;
                    this.cookie.set("user",JSON.stringify(this.user));
                }
                else
                {
                    let msg = ((document.getElementById("emailError") as HTMLParagraphElement));
                    msg.innerHTML = request.errors;
                    (document.getElementById("email") as HTMLInputElement).value = this.user.email;
                    (document.getElementById("txtEmail") as HTMLParagraphElement).innerText = this.user.email;
                }                      
            },
            error => 
            {
                ResetForm();
                txtEmail.innerText = this.user.email;
                email.value = this.user.email;
                console.error("Une erreur s'est produite lors de la requête HTTP :", error);
                var msg = ((document.getElementById("message"))as HTMLParagraphElement);
                msg.className = "error"
                msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
            });
        } 
        else
        {
            ResetForm();
        }
        

        function ResetForm()
        {
            btnEmail.hidden = false;
            btnEmailSave.hidden = true;
            btnEmailSave.className = "btn btn-primary";
            txtEmail.innerText = email.value;
            btnUsername.className = "btn btn-primary";
            btnUsername.disabled = false;
            btnAddress.className = "btn btn-primary";
            btnAddress.disabled = false;
            txtEmail.hidden = false;
            email.hidden = true;
        }
    }

    ValidationEmail(event:any)
    {   
        let email = event.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = ((document.getElementById("emailError") as HTMLParagraphElement));
        let btnEmailSave = ((document.getElementById("btnEmailSave") as HTMLButtonElement));
        if(!regex.test(email))
        {
            error.innerText = "L'adresse courriel n'est pas valide.";
            btnEmailSave.disabled = true;
        }
        else if (email != this.user.email)
        {
            error.innerText = "";
            
            this.http.get<any>(AppComponent.API_URL + "/emailIsAvailable/"+email).subscribe(request => 
            {
                if(!request.success)
                {
                    error.innerText = "L'adresse courriel n'est pas disponible.";
                    btnEmailSave.disabled = true;
                    if(!regex.test(email))
                    {
                        error.innerText = "L'adresse courriel n'est pas valide.";
                        btnEmailSave.disabled = true;
                    }
                }
                else
                {
                    btnEmailSave.disabled = false;
                }
            });
        }   
    }
    
    ChangeAddress() 
    {
        let address = ((document.getElementById("address") as HTMLInputElement));
        let txtAddress = ((document.getElementById("txtAddress") as HTMLParagraphElement));
        let city = ((document.getElementById("city") as HTMLInputElement));
        let txtCity = ((document.getElementById("txtCity") as HTMLParagraphElement));
        let postal = ((document.getElementById("postal") as HTMLInputElement));
        let txtPostal = ((document.getElementById("txtPostal") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnAddressSave = ((document.getElementById("btnAddressSave") as HTMLButtonElement));  
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));   
        btnAddress.hidden = true;
        btnAddressSave.hidden = false;
        btnEmail.className = "btn btn-secondary";
        btnEmail.disabled = true;
        btnUsername.className = "btn btn-secondary";
        btnUsername.disabled = true;
        txtAddress.hidden = true;
        address.hidden = false;
        txtCity.hidden = true;
        city.hidden = false;
        txtPostal.hidden = true;
        postal.hidden = false;
    }

    SaveAddress()
    {
        let address = ((document.getElementById("address") as HTMLInputElement));
        let txtAddress = ((document.getElementById("txtAddress") as HTMLParagraphElement));
        let city = ((document.getElementById("city") as HTMLInputElement));
        let txtCity = ((document.getElementById("txtCity") as HTMLParagraphElement));
        let postal = ((document.getElementById("postal") as HTMLInputElement));
        let txtPostal = ((document.getElementById("txtPostal") as HTMLParagraphElement));
        let btnUsername = ((document.getElementById("btnUsername") as HTMLButtonElement));
        let btnEmail = ((document.getElementById("btnEmail") as HTMLButtonElement));   
        let btnAddress = ((document.getElementById("btnAddress") as HTMLButtonElement));  
        let btnAddressSave = ((document.getElementById("btnAddressSave") as HTMLButtonElement));  
        if(btnAddressSave.className.toString().includes("loading"))
        {
            return;
        }
        let formData =
        {
            address:address.value,
            postal:postal.value,
            city:city.value
        };
        console.log(this.user.postal)
        if(formData.address != this.user.address.address || formData.postal != this.user.address.postal || formData.city != this.user.address.city)
        {
            btnAddressSave.className += " loading";
            this.http.post<any>(AppComponent.API_URL + "/changeAddress",formData,{ withCredentials: true }).subscribe(request => 
            {
                ResetForm();
                if (request.success == true)
                {
                    this.user.address = formData;
                    this.cookie.set("user",JSON.stringify(this.user));
                }
                else
                {
                    let msg = ((document.getElementById("addressError") as HTMLParagraphElement));
                    msg.innerHTML = request.errors;
                }                      
            },
            error => 
            {
                ResetForm();
                txtAddress.innerText = address.value;
                txtCity.innerText = city.value;
                txtPostal.innerText = postal.value;
                console.error("Une erreur s'est produite lors de la requête HTTP :", error);
                var msg = ((document.getElementById("message"))as HTMLParagraphElement);
                msg.className = "error"
                msg.innerHTML = "Problem posting the form. Node.js api server on port:3000 is probably offline. Look at console for more detail.";
            });
        }
        else
        {
            ResetForm();
        }     

        function ResetForm()
        {
            btnEmail.disabled = false;
            btnEmail.className = "btn btn-primary";
            btnAddressSave.hidden = true;
            txtAddress.hidden = false;
            address.hidden = true;
            btnUsername.className = "btn btn-primary";
            btnUsername.disabled = false;
            btnAddressSave.className = "btn btn-primary";  
            btnAddress.hidden = false;
            txtAddress.hidden = false;
            address.hidden = true;
            txtCity.hidden = false;
            city.hidden = true;
            txtPostal.hidden = false;
            postal.hidden = true;
            txtAddress.innerText = address.value;
            txtCity.innerText = city.value;
            txtPostal.innerText = postal.value;
        }
    }

    ValidationAddress(event:any)
    {
        let address = event.target.value;
        const regex = /^\d.*[a-zA-Z]$/;
        let btnAddressSave = ((document.getElementById("btnAddressSave") as HTMLButtonElement));
        let error = ((document.getElementById("addressError") as HTMLParagraphElement));
        if(!regex.test(address) && address != "")
        {
            error.innerText = "L'adresse de livraison n'est pas valide. Écriver votre adresse sous ce format : 123 rue";
            btnAddressSave.disabled = true;
        }
        else
        {
            error.innerText = "";
            btnAddressSave.disabled = false;
        }
    }

    ValidationCity(event:any)
    {
        let city = event.target.value;
        const regex = /^[a-zA-Z]+$/;
        let btnAddressSave = ((document.getElementById("btnAddressSave") as HTMLButtonElement));
        let error = ((document.getElementById("cityError") as HTMLParagraphElement));
        if(!regex.test(city) && city != "")
        {
            error.innerText = "Entrer une ville existante.";
            btnAddressSave.disabled = true;
        }
        else
        {
            error.innerText = "";
            btnAddressSave.disabled = false;
        }
    }

    ValidationPostal(event:any)
    {
        let postal = event.target.value;
        const regex = /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/;
        let btnAddressSave = ((document.getElementById("btnAddressSave") as HTMLButtonElement));
        let error = ((document.getElementById("postalError") as HTMLParagraphElement));
        if(!regex.test(postal) && postal != "" || postal.length > 6)
        {
            error.innerText = "Le code postal n'est pas valide.";
            btnAddressSave.disabled = true;
        }
        else
        {
            error.innerText = "";
            btnAddressSave.disabled = false;
        }
    }
}
