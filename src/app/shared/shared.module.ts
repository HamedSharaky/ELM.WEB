import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule,
  ],
  declarations: [],
  providers: [],
  exports: [FormsModule, ToastrModule, NgxUiLoaderModule],
})
export class SharedModule {}
