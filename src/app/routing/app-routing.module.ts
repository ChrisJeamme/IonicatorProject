import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const defaultsRoutes: Routes = [
    { path: '', redirectTo: 'page1', pathMatch: 'full' },
    {
        path: 'page1',
        loadChildren: '../modules/pages/page1/page1.page.module#Page1PageModule'
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
