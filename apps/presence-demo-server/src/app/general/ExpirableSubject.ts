import { Subject } from 'rxjs';

export class ExpirableSubject<T> extends Subject<T> {
  created: number;
  validFor: number;

  constructor(validSeconds: number) {
    super();
    this.created = Date.now();
    this.validFor =  this.created + validSeconds;
  }

  isValid(): boolean {
    return this.validFor > Date.now();
  }

  checkValidity() {
    if (!this.isValid()) {
      this.complete();
    }
  }
}
