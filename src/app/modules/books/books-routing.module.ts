import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { Shell } from 'src/app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'books',
      component: BooksListComponent,
      data: { title: 'Books' },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BooksRoutingModule {}
