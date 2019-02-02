import { Component, OnInit } from "@angular/core";
import { Page1Service } from "./page1.service";
import { Router } from "@angular/router";

@Component({
    selector: 'page1',
    templateUrl: './page1.page.html',
    styleUrls: ['../../../app.scss', './page1.page.scss'],
    host: { 'class': 'page1' },
    providers: [Page1Service]
})
export class Page1Page implements OnInit
{

    public articles: Array<any>;

    constructor(public page1Service: Page1Service, public router: Router)
    { }

    ngOnInit()
    {
        console.log("INIT PAGE1");

        this.page1Service.getArticles().subscribe(
            (data: Array<any>) =>
            {
                this.articles = data;

                this.page1Service.persistArticles(data).then(
                    ok =>
                    {
                        console.log("Les articles ont bien été stockés");
                    }
                );
            }
        );
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

