import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatSearchComponent } from './components/cat-search/cat-search.component';
import { CatSearchComponentModule } from './components/cat-search/cat-search.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'exam-search-autocomplete-cats', component: CatSearchComponent }]), CatSearchComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
