import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private snackBar: MatSnackBar) {}
  columns: string[];
  data: any[];

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(msg: string, isError: boolean = true): typeof EMPTY {
    this.showMessage(msg, isError);

    return EMPTY;
  }

  arrayToString(object: Object): string {
    const line = Object.values(object);
    return '"' + line.join('","') + '"';
  }

  convertToCSV(json): string {
    let output: string = '';
    if (json.length) {
      let i = 0;
      output = this.arrayToString(Object.keys(json[i])) + '\n';
      while (i < json.length) {
        output += this.arrayToString(json[i]) + '\n';
        i++;
      }
    } else {
      output = this.arrayToString(Object.keys(json)) + '\n';
      output += this.arrayToString(json);
    }
    return output;
  }

  toCSV(jsonString: string): string {
    let JsonParsed = '';
    try {
      JsonParsed = JSON.parse(jsonString);
    } catch {
      if(jsonString.trim().search('{') === 1){
        jsonString = String(`[${jsonString}]`);
      }
    }
    try {
      JsonParsed = JSON.parse(jsonString);
    } catch {
      this.errorHandler('JSON não é valido');
      return 'Erro ao converter estrutura de dados';
    }
      let saida = this.convertToCSV(JsonParsed);
      this.errorHandler('Conversão realizada', false);
      return saida;
    
  }

  toJson(CSVString: string): string {
    try {
      JSON.parse(CSVString);
      this.errorHandler('Já é um JSON valido', false);
      return CSVString;
    } catch {
      let arrayJsonObjects = [];

      let lines = CSVString.split('\n');
      let props = lines.shift().split(',');
      this.columns = props.map((value) => value.split('"').join(''));
      let i = 0;
      if (lines.length === 0) {
        this.errorHandler(
          'CSV deve ser composto de um header e pelo menos uma linha de dados',
          true
        );
        return 'CSV Invalido';
      }
      while (lines.length > 0) {
        const line = lines.shift().split(',');
        let jsonObject = {};
        i++;
        try {
          props.forEach((value) => {
            let prop = value.split('"').join('');
            jsonObject[prop] = line.shift().split('"').join('');
          });

          arrayJsonObjects.push(jsonObject);
        } catch {
          console.log(`Linha ${i} removida.`);
        }
      }
      this.data = arrayJsonObjects;
      const JSONsaida = JSON.stringify(arrayJsonObjects, null, 2);

      try {
        JSON.parse(JSONsaida);
        return JSONsaida;
      } catch {
        this.errorHandler('Não conseguimos converter seu CSV :(');
        return 'Erro ao converter estrutura de dados';
      }
    }
  }

  recoverData(): any[]{
    let dataRecovery = this.data;
    this.data = [];
    return dataRecovery;
  }

  recoverProps(): string[]{
    let columnsRecovery = this.columns;
    this.columns = [];
    return columnsRecovery;
  }
}
