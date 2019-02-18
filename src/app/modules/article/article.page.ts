import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService } from "../articles/articles.service";

@Component({
    selector: 'article',
    templateUrl: './article.page.html',
    styleUrls: ['../../app.scss', './article.page.scss'],
    host: { 'class': 'article' },
    providers: [ArticlesService]
})
export class ArticlePage implements OnInit
{
    @Input() article: any;

    constructor(public articlesService: ArticlesService,
                public router: Router)
    { }

    ngOnInit()
    {
        this.articlesService.getSelectedArticleId().then(
        id =>
        {
            if(id == null || id == undefined)
            {
                console.log("Erreur : Pas d'id défini")
            }
            console.log(id)
            this.articlesService.getArticleFromAPI(id, this.displayArticle, this.displayErrorGetArticle);
        });
    }

    goToArticles()
    {
        this.router.navigateByUrl("articles");
    }
    
    displayErrorGetArticle(error)
    {
        document.querySelector("#content").innerHTML =
        `
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
        <div class="articleBlock">
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>Article</ion-card-subtitle>
                    <ion-card-title>`+article.title+`</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    `+article.body+`
                </ion-card-content>
            </ion-card>
        </div>
        `;
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

