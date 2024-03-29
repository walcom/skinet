import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {

  @Input() linearModeSelected?: boolean;
  // constructor() { }

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  // tslint:disable-next-line: typedef
  onClick(index: number){
    this.selectedIndex = index;
    //  console.log(this.selectedIndex);
  }

}
