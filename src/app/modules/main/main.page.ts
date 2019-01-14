import { MainService } from './main.service';
import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  host: {'class': 'main'},
  providers: [MainService]
}) 
export class MainPage implements OnInit {

  public text: string;

  constructor(public router: Router, public mainService: MainService)
  {
    this.text = "PAR DEFAUT";
  }

  ngOnInit()
  {
    console.log("INIT MAIN PAGE");
    
    this.mainService.getArticle().subscribe(
      data =>
      {
        console.log(data);
      }
    );
  }

  goToPage1()
  {
    this.router.navigateByUrl("page1");
  }

  validateIdentifiant(identifiant: string)
  {
    // this.text = this.MainService.showText();
    this.text = identifiant;
  }
}

