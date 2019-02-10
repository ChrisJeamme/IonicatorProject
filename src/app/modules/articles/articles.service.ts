import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ArticlePage } from "../article/article.page";
import { ArticlesPage } from "./articles.page";

@Injectable()
export class ArticlesService
{
    constructor(public httpclient: HttpClient, public storage: Storage)
    {
    }

    getArticles()
    {
        return this.httpclient.get("https://jsonplaceholder.typicode.com/posts");
    }

    getArticlesFromStorage()
    {
        return this.storage.get("articles");
    }

    persistAnArticle(article, callback)
    {
        this.storage.get("articles").then(
            articles =>
            {
                if(articles == undefined || articles == null)
                    articles = Array<any>();

                articles.push(article);
                console.log("Nouvel article ajouté au cache");

                this.storage.set("articles",articles);
            }
        ); 
    }

    deleteAnArticle(articleToDelete, callback)
    {
        this.storage.get("articles").then(
            articles =>
            {
                if(articles == undefined || articles == null)
                {
                    callback(articleToDelete.id);
                    presentAlert("Erreur","Suppression","Impossible de supprimer l'article");
                }

                let deleted = false;
                for(let article in articles)
                {
                    if(articles[article].id == articleToDelete.id)
                    {
                        articles.splice(article,article);
                        console.log("Article supprimé du cache");
                        deleted = true;
                    }
                }
                if(!deleted)
                {
                    callback(articleToDelete.id);
                    presentAlert("Erreur","Suppression","Impossible de supprimer l'article");
                }
                
                this.storage.set("articles",articles);
            }
        );
    }

    articleStored(articleToTest)
    {
        if(articleToTest == undefined || articleToTest == null)
        {
            return false;
        }

        this.storage.get("articles").then(
        articles =>
        {
            
            if(articles == undefined || articles == null)
                return false;


            for(let article in articles)
            {
                if(articles[article].id == articleToTest.id)
                    return true;
            }
        });
    }

    persistArticles(articles)
    {
        return this.storage.set("articles", articles.sort((a,b)=>a.id>b.id));
    }

    getArticleFromAPI(id, success, error)
    {
        this.httpclient.get("https://jsonplaceholder.typicode.com/posts/"+id).subscribe(
            article =>
            {
                if(article == null || article == undefined)
                    error();
                else
                    success(article);
            }
        );
    }

    getArticleFromStorage(id, success, error)
    {
        this.storage.get("articles").then(
        articles=>
        {
            if(articles != null)
            {
                for(let i in articles)
                {
                    if(articles[i].id == id)
                    {
                        success(articles[i]);
                        return ;
                    }
                }
            }
            error("Article non trouvé");
        });
    }

    public getSelectedArticleId()
    {
        return this.storage.get("selected_article_id");
    }
    
    public setSelectedArticleId(id: string)
    {
        this.storage.set("selected_article_id",id);
    }
}
