import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay'
import { OverlaySpinnerService } from './overlay-spinner.service';
import { OverlaySpinnerComponent } from './overlay-spinner.component';
// import { OverlaySpinnerComponent } from './overlay-spinner.component';

@NgModule({
  declarations: [OverlaySpinnerComponent],
  imports: [
    MatProgressSpinnerModule,
    OverlayModule
  ],
  entryComponents:[OverlaySpinnerComponent],
  exports:[OverlaySpinnerComponent],
  providers: [OverlaySpinnerService],
})
export class OverlaySpinnerModule { }
