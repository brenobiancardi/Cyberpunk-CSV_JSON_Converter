import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  init: boolean = false;
  show: boolean = false;

  constructor(
    private homeService: HomeService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Web]).subscribe((result) => {
      if (result.matches) {
        this.init = true;
      }
    });
  }

  converterForm = new FormGroup({
    input: new FormControl('', Validators.required),
    output: new FormControl(''),
  });

  get input() {
    return this.converterForm.get('input');
  }

  get output() {
    return this.converterForm.get('output');
  }

  converterCSVJSON(): void {
    this.show = true;
    const saida = this.homeService.toJson(this.input.value);

    this.homeService.recoverData();
    this.homeService.recoverProps();
    this.output.setValue(saida);
  }

  converterJSONCSV(): void {
    this.show = true;
    const saida = this.homeService.toCSV(this.input.value);
    this.homeService.recoverData();
    this.homeService.recoverProps();
    this.output.setValue(saida);
  }
}
