import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, map, of, startWith } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { CatModel } from '../../models/cat.model';
import { CatService } from '../../services/cat.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatSearchComponent {
  readonly searchForm: FormGroup = new FormGroup({ cityName: new FormControl(''), price: new FormControl(''), searchTerm: new FormControl('') });

  public citySearch$: Observable<string> = this.searchForm.valueChanges.pipe(
    map(form => form.cityName)
  );

  readonly cities$: Observable<CityModel[]> = combineLatest([
    this.citySearch$.pipe(
      startWith('')
    ),
    this._cityService.getAll()
  ]).pipe(
    map(([cityName, cities]: [string, CityModel[]]) => {
      return cities.filter(
        city => city.name.toLowerCase().includes(cityName.toLowerCase())
      )
    })
  )

  readonly prices$: Observable<number[]> = of([0, 100, 200, 300, 400]);

  readonly list$: Observable<CatModel[]> = combineLatest([
    this.searchForm.valueChanges.pipe(
      startWith({
        cityName: '',
        price: '',
        searchTerm: ''
      })
    ),
    this._catService.getAll()
  ]).pipe(
    map(([form, cats]) => {
      return cats.filter(
        cat => cat.breed.toLowerCase().includes(form.searchTerm.toLowerCase())
          && (form.price === '' || cat.price == form.price)
          && (form.cityName === '' || cat.cityName == form.cityName)
      );
    })
  )

  constructor(private _catService: CatService, private _cityService: CityService) {
  }
}
