import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/interceptors/http.service';
import { SHOW_LOADER_MARKER } from 'src/app/shared/models/constants';
import { SearchBookRequest, SearchBookResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private controller = 'Books';

  constructor(private http: HttpService) {}

  search(request: SearchBookRequest): Observable<SearchBookResponse> {
    let params = new HttpParams().set(
      'SearchTerm',
      request.searchTerm.toString()
    );
    params = params.set('Page', request.page.toString());
    params = params.set('PageSize', request.pageSize.toString());

    return this.http.get<SearchBookResponse>(
      `${this.controller}/Search${SHOW_LOADER_MARKER}`,
      { params }
    );
  }
}
