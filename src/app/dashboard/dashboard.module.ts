import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';


import { ProvinciaDTO } from '../_model/provincia_dto';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ChartsModule,
    MatSliderModule,
    ButtonsModule,
    PDFExportModule,
    DropDownsModule,
    InputsModule,
    GridModule,
    FormsModule,
 
    RouterModule.forChild(DashboardRoutes)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
