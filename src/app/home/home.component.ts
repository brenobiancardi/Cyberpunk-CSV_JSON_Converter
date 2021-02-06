import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{
  constructor(private homeService: HomeService) {}

  converterForm = new FormGroup({
    input: new FormControl('', Validators.required),
    output: new FormControl(''),
  });

  data: any[];
  columns: string[];

  get input() {
    return this.converterForm.get('input');
  }

  get output() {
    return this.converterForm.get('output');
  }

  converterCSVJSON(): void {
    const saida = this.homeService.toJson(this.input.value);
    this.data = this.homeService.recoverData();
    this.columns = this.homeService.recoverProps();
    this.output.setValue(saida);
  }

  converterJSONCSV(): void {
    const saida = this.homeService.toCSV(this.input.value);
    this.data = this.homeService.recoverData();
    this.columns = this.homeService.recoverProps();
    this.output.setValue(saida);
  }
}
