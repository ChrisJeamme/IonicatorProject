import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class MainService
{
    constructor(public httpClient:HttpClient)
    {}

    public showText(): string
    {
        const text: string = "Mon texte"; 
        return text;
    }
    
    getArticle()
    {
        return this.httpClient.get("https://jsonplaceholder.typicode.com/posts");
        //  .subscribe(
        //  data=>
        //  {
        //    console.log(data);
        //  });
    }
}