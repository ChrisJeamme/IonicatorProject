import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const defaultsRoutes: Routes = [
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
    {
        path: 'articles',
        loadChildren: '../modules/articles/articles.page.module#ArticlesPageModule'
    },
    {
        path: 'login',
        loadChildren: '../modules/login/login.page.module#LoginPageModule'
    },
    {
        path: 'article',
        loadChildren: '../modules/article/article.page.module#ArticlePageModule'
    }

];

const concatRoutes: Routes = [...defaultsRoutes] as Routes;

@NgModule({
    imports: [
        RouterModule.forRoot(concatRoutes, {
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule
{ }
