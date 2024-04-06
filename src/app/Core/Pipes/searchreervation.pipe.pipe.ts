import { Pipe, PipeTransform } from '@angular/core';
import { Orderdetails } from '../Interfaces/orderdetails';

@Pipe({
  name: 'searchreervationPipe',
  standalone: true,
})
export class SearchreervationPipePipe implements PipeTransform {
  transform(
    Orderdetails:Orderdetails[] | undefined,
    term: string
  ): Orderdetails[] | undefined {
    return Orderdetails?.filter(
      (item) =>
        item.caregiverFirstName.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)||
        item.patientFirstName.toLowerCase().includes(term)
    );
  }
}
