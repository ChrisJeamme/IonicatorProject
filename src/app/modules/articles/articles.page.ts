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
    public offlineMode: boolean = false;

    private NUMBER_OF_ARTICLE_ON_MAIN_PAGE = 10;

    constructor(public router: Router,
                public articlesService: ArticlesService,
                public alertController: AlertController)
    { }

    async presentAlert(title:string, subtitle:string, message:string)
    {
        const alert = await this.alertController.create(
        {
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
                // Récupération des articles distants
                this.articles = data;

                // Coche les articles déjà enregistrés
                this.articlesService.getArticlesFromStorage().then(
                articles =>
                {
                    if(document.querySelectorAll(".save_toggle").length != 0)
                    {
                        for(let article in articles)
                        {
                            let toggle:HTMLIonToggleElement = document.querySelector(".save_toggle_"+articles[article].id);

                            if(toggle.id != undefined)
                                toggle.checked = true;
                        }
                    }
                });
            },
            error =>
            {
                this.articlesService.getArticlesFromStorage().then(
                    offlineArticles =>
                    {
                        this.offlineMode = true;

                        if(offlineArticles == null)
                        {
                            console.log("(Mode offline) Aucun article trouvé dans le cache")
                            this.alert = "Mode hors-ligne";
                            this.presentAlert("Erreur","Récupération des articles","Aucun article disponible");
                        }
                        else
                        {
                            console.log("(Mode offline) Articles trouvés dans le cache")
                            this.presentAlert("Erreur","Récupération des articles","En raison d'une impossibilité de récupérer les articles, nous vous présentons les articles en cache");
                            this.alert = "Mode hors-ligne";
                            this.articles = offlineArticles;
                        }
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

    toggleSaveArticle(article)
    {
        let toggle:HTMLIonToggleElement = document.querySelector(".save_toggle_"+article.id);

        if(toggle != undefined)
        {
            if(toggle.checked)
            {
                // To save
                console.log("Nouvel article à sauvegarder")
                this.articlesService.persistAnArticle(article, this.disableSaveToggle);
            }
            else
            {
                // To delete
                console.log("Nouvel article à supprimer")
                this.articlesService.deleteAnArticle(article, this.enableSaveToggle);
            }
        }
    }

    // Revert the toggle
    enableSaveToggle(id)
    {
        let toggle:HTMLIonToggleElement = document.querySelector(".save_toggle_"+id);
        if(toggle != undefined)
        {
            // toggle.checked = true;
        }
    }
    
    // Revert the toggle
    disableSaveToggle(id)
    {
        let toggle:HTMLIonToggleElement = document.querySelector(".save_toggle_"+id);
        if(toggle != undefined)
        {
            // toggle.checked = false;
        }
    }

    logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
}

