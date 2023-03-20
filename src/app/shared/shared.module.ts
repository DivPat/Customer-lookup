import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScreenHeaderComponent } from './components/screen-header/screen-header.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const components  = [HeaderComponent, ScreenHeaderComponent, InfiniteScrollDirective, PageNotFoundComponent]
const imports = [CommonModule, TranslateModule]
@NgModule({
  declarations: [...components],
  imports: [
    ...imports
  ],
  exports: [ ...components, ...imports]
})

export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ ]
    }
  }
  constructor(private translate: TranslateService) {
    if(!this.translate.defaultLang) {
      this.translate.setDefaultLang("en");
    } else {
      this.translate.getTranslation(this.translate.currentLang || this.translate.defaultLang);
    }
  
  }

}
