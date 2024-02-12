import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [BooksListComponent],
  imports: [
    CommonModule,
    SharedModule,
    BooksRoutingModule,
    InfiniteScrollModule,
  ],
})
export class BooksModule {}
