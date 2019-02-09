import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ArticlesService } from "./articles.service";
import { ArticlesPage } from "./articles.page";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ArticlesPage
            }
        ])
    ],
    providers: [ArticlesService],
    bootstrap: [ArticlesPage],
    declarations: [ArticlesPage]
})
export class ArticlesPageModule
{
}
