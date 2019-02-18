<<<<<<< HEAD
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
  providers: [],
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }
=======
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
        this.identificationRedirection();
    }
    
    connected()
    {
        return localStorage.hasOwnProperty('identifiant');
    }

    identificationRedirection()
    {
        if(!this.connected())
          this.router.navigateByUrl("login");
    }

    public logout()
    {
        console.log("Déconnexion");
        localStorage.removeItem('identifiant');
        this.router.navigateByUrl("login");
    }
>>>>>>> groupeC_BRUYERE-JEAMME_final
}
