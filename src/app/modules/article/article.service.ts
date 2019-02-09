import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class ArticleService
{
    constructor(public storage: Storage){}

    public getSelectedArticleId()
    {
        return this.storage.get("selected_article_id");
    }
    
    public setSelectedArticleId(id: string)
    {
        this.storage.set("selected_article_id",id);
    }
}
