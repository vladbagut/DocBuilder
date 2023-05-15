import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExtractComponent } from './components/extract/extract.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'asigurare',
    component: ExtractComponent,
    data: { docTypeKey: 'asigAuto' },
  },
  {
    path: 'inscriere',
    component: ExtractComponent,
    data: { docTypeKey: 'fisaInscriere' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
