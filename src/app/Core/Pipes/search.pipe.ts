import { Pipe, PipeTransform } from '@angular/core';
import { ICaregiver } from '../Interfaces/caregiver';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(caregivers: ICaregiver[]|undefined ,term:string): ICaregiver[]|undefined {
    return caregivers?.filter((item) =>
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term))
    ;
  }
}
