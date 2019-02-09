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

    persistArticles(articles)
    {
        return this.storage.set("articles", articles.sort((a,b)=>a.id>b.id));
    }

    getArticle(id, success, error)
    {
        // TODO : requete à l'api, si pas de réponse ou incorrect je cherche dans les articles stockés
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
