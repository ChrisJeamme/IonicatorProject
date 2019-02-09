import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleService } from "./article.service";

@Component({
    selector: 'article',
    templateUrl: './article.page.html',
    styleUrls: ['../../app.scss', './article.page.scss'],
    host: { 'class': 'article' }
})
export class ArticlePage implements OnInit
{
    @Input() article: any;

    constructor(public articleService: ArticleService, public router: Router)
    { }

    // Test //////////////////
    logService()
    {
        console.log(this.articleService.getSelectedArticleId());
    }
    /////////////////////////

    ngOnInit()
    {
        console.log("INIT ARTICLE");
        // console.log("Article = "+this.articleService.getSelectedArticleId())
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

