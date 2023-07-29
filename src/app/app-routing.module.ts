import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  /* First and main route to get the pages list */
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('../pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
