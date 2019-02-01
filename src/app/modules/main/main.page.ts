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
        console.log("INIT MAIN PAGE"+localStorage.getItem("identifiant"));
        if (localStorage.getItem("identifiant") === null)
        {
            console.log("Salut")
            this.router.navigateByUrl("login")
        }
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

    logout()
    {
        console.log("Déconnexion")
        localStorage.setItem("identifiant",null);
        this.router.navigateByUrl("main");
    }
}

