import { BasePaginationRequestModel } from "src/app/shared/models/pagination/base-pagination-request.model";
import { BasePaginationResponseModel } from "src/app/shared/models/pagination/base-pagination-response.model";

export interface SearchBookRequest extends BasePaginationRequestModel{
  searchTerm: string;
}
export interface SearchBookResponse extends BasePaginationResponseModel {
    books: BookInListModel[];
}
export interface BookInListModel {
  bookId: number;
  bookTitle: string;
  bookDescription: string;
  author: string;
  publishDate: Date;
  coverBase64: string;
  lastModified: Date;
}
