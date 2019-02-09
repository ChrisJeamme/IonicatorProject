import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleService } from "./article.service";
import { Page1Service } from "../pages/page1/page1.service";

@Component({
    selector: 'article',
    templateUrl: './article.page.html',
    styleUrls: ['../../app.scss', './article.page.scss'],
    host: { 'class': 'article' },
    providers: [Page1Service]
})
export class ArticlePage implements OnInit
{
    @Input() article: any;

    constructor(public articleService: ArticleService,
                public page1Service: Page1Service,
                public router: Router)
    { }

    ngOnInit()
    {
        this.articleService.getSelectedArticleId().then(
        id =>
        {
            if(id == null || id == undefined)
            {
                console.log("Erreur : Pas d'id défini")
            }
            this.page1Service.getArticle(id, this.displayArticle, this.displayErrorGetArticle);
        });
    }

    goToArticles()
    {
        console.log("allo")
        this.router.navigateByUrl("page1");
    } 

    displayErrorGetArticle(error)
    {
        document.querySelector("#content").innerHTML =
        `
        <ion-button fill="outline" slot="end" expand="full" color="dark" (click)="goToArticles()">Retour</ion-button>
        <ion-card color="danger">
            <ion-card-header>
                <ion-card-title>Erreur</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                `+error+`
            </ion-card-content>
        </ion-card>
        `;
    }
    
    displayArticle(article)
    {
        document.querySelector("#content").innerHTML =
        `
        <ion-button fill="outline" slot="end" expand="full" color="dark" (click)="goToArticles()">Retour</ion-button>
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle>Article</ion-card-subtitle>
                <ion-card-title>`+article.title+`</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <img src="assets/illustration.bmp"></img>
                `+article.body+`
            </ion-card-content>
        </ion-card>
        `;
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

