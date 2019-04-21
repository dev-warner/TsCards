import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MarkdownPostComponent } from './markdown-post/markdown-post.component';

const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full'  },
  { path: 'detail/:type/:name', component: MarkdownPostComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
