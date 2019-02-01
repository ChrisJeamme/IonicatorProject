import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    host: { 'class': 'main' },
    providers: []
})
export class MainPage implements OnInit
{

    public identifiant: string;

    constructor(public router: Router) { }

    ngOnInit()
    {
        if (localStorage.getItem("identifiant") == null)
        {
            console.log("Non connecté, connexion nécéssaire")
        }
        else
            this.identifiant = localStorage.getItem("identifiant");
    }

    goToPage1()
    {
        this.router.navigateByUrl("page1");
    }

    goToLogin()
    {
        this.router.navigateByUrl("login");
    }

    connected()
    {
        return localStorage.hasOwnProperty('identifiant');
    }

    logout()
    {
        console.log("Déconnexion")
        localStorage.removeItem('identifiant')
    }
}

