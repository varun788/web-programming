
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get curValue(): string {
    return this._curValue;
  }

  set curValue(value: string) {
    this._curValue = value;
  }
  result = '';
  longButtons: string[] = ['AC' , 'CE'];
  buttons: string[] = ['7', '8', '9', '/' , '4' , '5' , '6' , '*' , '1' , '2' , '3' , '-' , '.' , '0' , '=' , '+'];
  private preValue = '' ;
  private _curValue = '' ;
  addToExpression(value: string) {
    if (this.result !== '') {
      this.preValue = this._curValue;
      this._curValue = value;
    }
    if (value === 'AC') {
      this.result = '';
    } else if (value === 'CE') {
      this.result = this.preValue !== '=' ? this.result.slice(0, -1) : this.result ;
    } else if (value === '=') {
      // tslint:disable-next-line:no-eval
      this.result = eval(this. result);
    } else {
      this.result += value ; }
  }
}
