import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './interceptors/http.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, CommonModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
