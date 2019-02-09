import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ArticlePage } from "./article.page";

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
    bootstrap: [ArticlePage],
    declarations: [ArticlePage]
})
export class ArticlePageModule
{
}
