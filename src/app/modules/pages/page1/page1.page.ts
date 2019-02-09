import { Component, OnInit } from "@angular/core";
import { Page1Service } from "./page1.service";
import { Router } from "@angular/router";
import { ArticleService } from "../../article/article.service";

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
    private NUMBER_OF_ARTICLE_ON_MAIN_PAGE = 10;

    constructor(public page1Service: Page1Service,
                public router: Router,
                public articleService: ArticleService)
    { }

    ngOnInit()
    {
        console.log("INIT PAGE1");
        
        console.log(this.articleService.getSelectedArticleId());

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

    // Test //////////////////
    logService()
    {
        console.log(this.articleService.getSelectedArticleId());
    }
    /////////////////////////

    goToArticle(id: string)
    {
        if(this.articles[parseInt(id)] != undefined)
        {
            this.articleService.setSelectedArticleId(id);
            this.router.navigateByUrl("article");
        }
        else
        {
            this.articleService.setSelectedArticleId(undefined);
        }
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

