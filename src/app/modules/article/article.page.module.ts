import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ArticlePage } from "./article.page";
import { ArticleService } from "./article.service";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ArticlePage
            }
        ])
    ],
    providers: [ArticleService],
    bootstrap: [ArticlePage],
    declarations: [ArticlePage]
})
export class ArticlePageModule
{
}
