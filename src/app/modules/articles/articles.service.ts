import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";

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
        if(!this.articleStored(article))
        {
            this.storage.get("articles").then(
                articles =>
                {
                    if(articles == undefined || articles == null)
                        articles = Array<any>();

                    articles.push(article);
                    console.log("Nouvel article ajouté au cache");

                    this.storage.set("articles",articles);
                    callback(article.id);
                }
            );
        }
    }

    deleteAnArticle(article, callback)
    {
        if(!this.articleStored(article)) //TODO A modifier après avoir fait la fonction
        {
            this.storage.get("articles").then(
                articles =>
                {
                    if(articles == undefined || articles == null)
                        articles = Array<any>();

                    let indexToDelete = articles.indexOf(article);
                    articles.splice(indexToDelete,indexToDelete);

                    console.log("Article supprimé du cache");

                    this.storage.set("articles",articles);
                    callback(article.id);
                }
            );
        }
    }

    articleStored(article)
    {
        //TODO Vérifier si pas déjà stored
        return false;
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
