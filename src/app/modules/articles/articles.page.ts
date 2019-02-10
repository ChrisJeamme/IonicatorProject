import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService } from "./articles.service";
import { AlertController } from '@ionic/angular';

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
    public alert: any;

    private NUMBER_OF_ARTICLE_ON_MAIN_PAGE = 10;

    constructor(public router: Router,
                public articlesService: ArticlesService,
                public alertController: AlertController)
    { }

    async presentAlert(title:string, subtitle:string, message:string)
    {
        const alert = await this.alertController.create({
          header: title,
          subHeader: subtitle,
          message: message,
          buttons: ['OK']
        });
    
        await alert.present();
    }

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
            },
            error =>
            {
                let offlineArticles = this.articlesService.getArticlesFromStorage().then(
                    offlineArticles =>
                    {
                        console.log("(Mode offline) Articles trouvés dans le cache")
                        this.presentAlert("Erreur","Récupération des articles","En raison d'une impossibilité de récupérer les articles, nous vous présentons les articles en cache");
                        this.alert = "Mode hors-ligne";
                        this.articles = offlineArticles;
                    },
                    error =>
                    {
                        console.log("(Mode offline) Aucun article trouvé dans le cache")
                        this.alert = "a";
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
        let articles;
        try
        {
            articles = this.articles.slice(this.NUMBER_OF_ARTICLE_ON_MAIN_PAGE);
        }
        catch(error)
        {
            // console.error(error);
        }
        return articles;
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

