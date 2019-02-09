import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class ArticleService
{
    public selected_article_id: string;

    constructor(public storage: Storage)
    {
        this.selected_article_id = "(Valeur par défaut)";
    }

    public getSelectedArticleId()
    {
        return this.selected_article_id;
    }
    
    public setSelectedArticleId(id: string)
    {
        this.selected_article_id = "(Valeur modifié)";
    }
}
