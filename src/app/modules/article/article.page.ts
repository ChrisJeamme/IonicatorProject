import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'article',
    templateUrl: './article.page.html',
    styleUrls: ['../../app.scss', './article.page.scss'],
    host: { 'class': 'article' },
    providers: []
})
export class ArticlePage implements OnInit
{
    public articles: Array<any>;

    constructor(public router: Router)
    { }

    ngOnInit()
    {
        console.log("INIT ARTICLE");
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

