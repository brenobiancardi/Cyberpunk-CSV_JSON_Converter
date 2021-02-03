import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  arrayToString(object: Object): string {
    const line = Object.values(object);
    return '"' + line.join('","') + '"';
  }

  toCSV(jsonString: string): string {
    try {
      const a = JSON.parse(jsonString);
      let saida = '';

      if (a.length) {
        let i = 0;
        saida = this.arrayToString(Object.keys(a[i])) + '\n';
        while (i < a.length) {
          saida += this.arrayToString(a[i]) + '\n';
          i++;
        }
      } else {
        saida = this.arrayToString(Object.keys(a)) + '\n';
        saida += this.arrayToString(a);
      }
      return saida;
    } catch {
      return 'JSON não é valido';
    }
  }

  toJson(CSVString: string): string {
    let lines = CSVString.split('\n');
    let jsonObject = {};
    let props = lines.shift().split(',');
    const keysProps = props;
    while (props.length > 0) {
      const prop = props.shift();
      Object.defineProperty(jsonObject, prop, {
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
    while (lines.length > 0) {
      const line = lines.shift().split(',');
      // line.map((value,index) =>
    }
    return 'string';
  }
}
