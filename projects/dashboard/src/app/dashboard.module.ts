import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppChildRoutingModule } from './app-routing.child.module';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetModule } from 'projects/widget/src/public-api';
import { HeaderModule } from 'projects/header/src/lib/header.module';
import { MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppChildRoutingModule,
    WidgetModule,
    CommonModule,
    HeaderModule,
    MatDividerModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class DashboardModule { }

