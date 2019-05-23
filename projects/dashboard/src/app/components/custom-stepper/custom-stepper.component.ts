import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: "app-custom-stepper",
  templateUrl: "./custom-stepper.component.html",
  styleUrls: ["./custom-stepper.component.css"],
  // This custom stepper provides itself as CdkStepper so that it can be recognized
  // by other components.
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }]
})
export class CustomStepperComponent extends CdkStepper {

  

  customSteps: any[] = [{title:"Step 1", number: 1, isActive:true, isLast:false}, 
                        {title:"Step 2", number: 2, isActive: false, isLast:false},
                        {title:"Step 3", number: 3, isActive: false, isLast:true}
                       ]
  
  onClick(index: number): void {
    this.selectedIndex = index;
  }

  handleStepClick(stepNumberSelected){
    const previousIndex =this.selectedIndex;
    //jump one step forward
      if(this.selectedIndex+1 === stepNumberSelected -1){
      const nextStep = this.customSteps[this.selectedIndex + 1];
      const currentStep = this.customSteps[this.selectedIndex];
      this.next();
      if(previousIndex === this.selectedIndex){
        console.log("step need to be completed");
        currentStep.isActive = true
        nextStep.isActive = false;
      } else {
        currentStep.isActive = false
        nextStep.isActive = true;
        return
      }
    }
    //jump one step back
    if(this.selectedIndex-1 === stepNumberSelected -1){
      const previousStep = this.customSteps[this.selectedIndex -1];
      const currentStep = this.customSteps[this.selectedIndex];
      this.previous();
      if(previousIndex === this.selectedIndex){
        
        currentStep.isActive = true
        previousStep.isActive = false;
      } else {
        currentStep.isActive = false
        previousStep.isActive = true;
        return;
      }
    }
    
    const jumpForward = stepNumberSelected -1 > previousIndex;
    const index = stepNumberSelected -1;
    if(jumpForward){
      while(this.selectedIndex < index){
        this.next();
        if(this.selectedIndex === previousIndex){
          console.log("complete current step first");
          return;
        }
      }
      this.customSteps[previousIndex].isActive = false;
      this.customSteps[stepNumberSelected -1].isActive = true;
    } else {
      while(this.selectedIndex > index){
        this.previous();
        if(this.selectedIndex === previousIndex){
          console.log("complete current step first");
          return;
        }
      }
      this.customSteps[previousIndex].isActive = false;
      this.customSteps[stepNumberSelected -1].isActive = true;
    }
    
  }

  
  onNext($event){
    const isNextStep = this.selectedIndex + 1 <= this.customSteps.length -1;
    if(isNextStep){
      const nextStep = this.customSteps[this.selectedIndex + 1];
      const currentStep = this.customSteps[this.selectedIndex];
      const currentIndex =this.selectedIndex;
      this.next();
      if(currentIndex === this.selectedIndex){
        console.log("step need to be completed");
        currentStep.isActive = true
        nextStep.isActive = false;
      } else {
        currentStep.isActive = false
        nextStep.isActive = true;
      }
    }
  }
  onPrevious($event){
    const isPreviosStep = this.selectedIndex - 1 >= 0;
    if(isPreviosStep){
      const previousStep = this.customSteps[this.selectedIndex -1];
      const currentStep = this.customSteps[this.selectedIndex];
      const currentIndex = this.selectedIndex;
      this.previous();
      if(currentIndex === this.selectedIndex){
        console.log(this.selected);
        console.log("step need to be completed");
        currentStep.isActive = true
        previousStep.isActive = false;
      } else {
        currentStep.isActive = false
        previousStep.isActive = true;
      }
    }
  }
}