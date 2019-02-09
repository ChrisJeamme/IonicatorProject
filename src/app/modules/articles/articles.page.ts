import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService } from "./articles.service";

@Component({
    selector: 'articles',
    templateUrl: './articles.page.html',
    styleUrls: ['../../app.scss', './articles.page.scss'],
    host: { 'class': 'articles' },
    providers: [ArticlesService]
})
export class ArticlesPage implements OnInit
{

    public articles: Array<any>;
    private NUMBER_OF_ARTICLE_ON_MAIN_PAGE = 10;

    constructor(public router: Router,
                public articlesService: ArticlesService)
    { }

    ngOnInit()
    {
        this.articlesService.getArticles().subscribe(
            (data: Array<any>) =>
            {
                this.articles = data;

                this.articlesService.persistArticles(data).then(
                    ok =>
                    {
                        console.log("Les articles ont bien été stockés");
                    }
                );
            }
        );
    }

    goToArticle(id: string)
    {
        this.articlesService.setSelectedArticleId(id);
        this.router.navigateByUrl("article");
    }

    tenArticles()
    {
        return this.articles.slice(0, this.NUMBER_OF_ARTICLE_ON_MAIN_PAGE);
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

