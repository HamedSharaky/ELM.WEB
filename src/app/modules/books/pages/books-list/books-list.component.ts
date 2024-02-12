import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Logger } from 'src/app/core/services/common/logger.service';
import {
  BookInListModel,
  SearchBookRequest,
} from 'src/app/modules/books/models/search.model';
import { BookService } from 'src/app/modules/books/services/book.service';

const log = new Logger('app-books-list');

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: BookInListModel[] = [];
  searchTerm: string = '';

  pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  constructor(
    private bookService: BookService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  convertDateToString(date: Date): string {
    return date.toDateString();
  }

  searchBooks() {
    if (!this.searchTerm) {
      return;
    }

    const request = {
      page: this.pagination.currentPage,
      pageSize: this.pagination.itemsPerPage,
      searchTerm: this.searchTerm,
    } as SearchBookRequest;

    this.bookService.search(request).subscribe({
      next: (res) => {
        if (!res) {
          this.handleError(res);
          return;
        }

        this.books = [...this.books, ...res.books];
        this.pagination.currentPage = res.currentPage > 0 ? res.currentPage : 1;
        this.pagination.totalItems = res.totalItems;

        log.info(res);
      },
      error: (e) => this.handleError(e),
    });
  }

  handleError = (error: any) => {
    this.toastrService.error('حدث خطأ .. من فضلك حاول مرة اخرى', 'خطأ تقني');
    log.error(error);
  };

  onScroll = () => {
    if (this.pagination.totalItems === this.books.length) {
      return;
    }

    this.pagination.currentPage++;
    this.searchBooks();
  };
}
