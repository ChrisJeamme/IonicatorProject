import { Component } from "@angular/core";

@Component({
    selector: 'article',
    template: `
      <ion-button (click)="onClickMe()">Click me!</ion-button>
      {{clickMessage}}`
  })
  export class ClickMeComponent
  {
    clickMessage = '';
  
    onClickMe() {
      this.clickMessage = 'You are my hero!';
    }
  }