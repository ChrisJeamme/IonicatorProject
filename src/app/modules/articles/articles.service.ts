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
                }
            );
        }
        else
        {            
            callback(article.id);
        }
    }

    deleteAnArticle(articleToDelete, callback)
    {
        if(!this.articleStored(articleToDelete)) //TODO A modifier après avoir fait la fonction
        {
            this.storage.get("articles").then(
                articles =>
                {
                    if(articles == undefined || articles == null)
                        callback(articleToDelete.id);

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
                        callback(articleToDelete.id);
                    
                    this.storage.set("articles",articles);
                }
            );
        }
        else
        {
            callback(articleToDelete.id);
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
