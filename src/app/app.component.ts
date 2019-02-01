import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.scss'],
    providers: [],
})
export class AppComponent implements OnInit
{

    constructor(public router: Router) { }

    ngOnInit()
    {
        if (localStorage.hasOwnProperty('identifiant'))
        {
          this.router.navigateByUrl("page1");
        }
        else
        {
          this.router.navigateByUrl("login");
        }
        // localStorage.setItem("identifiant", "Mickael");

    }
    
    connected()
    {
        return localStorage.hasOwnProperty('identifiant');
    }
}
