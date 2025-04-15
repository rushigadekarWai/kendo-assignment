import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { KENDO_BUTTON, KENDO_BUTTONGROUP, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_TOGGLEBUTTONTABSTOP, KendoInput } from '@progress/kendo-angular-common';
import { DropDownsModule, KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { CreateFormGroupArgs, EditEvent, KENDO_GRID, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { IconsModule, KENDO_ICONS, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { KENDO_CHECKBOX, KENDO_INPUTS, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_AVATAR, KENDO_GRIDLAYOUT, KENDO_TABSTRIP, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { downloadIcon, fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { Product } from "./model";
import { products } from "./products";
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-task-grid-layout',
  imports: [
    ReactiveFormsModule,
    
    KENDO_SVGICON,
    IconsModule,
    KENDO_AVATAR,
    LayoutModule,
    IndicatorsModule,
    NgClass,
    KENDO_TABSTRIP,
    NgFor,
    KENDO_DROPDOWNBUTTON,
    KENDO_DROPDOWNLIST,
    DropDownsModule,
    RouterOutlet,
    KENDO_ICONS,
    KENDO_BUTTON,
    KENDO_GRID,
    KENDO_GRIDLAYOUT,
    KENDO_DROPDOWNLIST,
    KENDO_GRIDLAYOUT,
    KENDO_BUTTONGROUP,
    KENDO_INPUTS,
    FormsModule,
    KENDO_TOOLBAR,
    KENDO_APPBAR,
    KENDO_DROPDOWNBUTTON,
    KENDO_TOGGLEBUTTONTABSTOP, DropDownsModule, KENDO_CHECKBOX,NgClass, KENDO_TEXTBOX,KENDO_DIALOG, KENDO_DROPDOWNBUTTON, NgIf
    
  ],
  templateUrl: './task-grid-layout.component.html',
  styleUrl: './task-grid-layout.component.css'
})
export class TaskGridLayoutComponent {
  public fileExcelIcon: SVGIcon = fileExcelIcon;

  public products: unknown[] = products;

  createNewProduct(): Product {
    return new Product();
  }

  commandColumnStyles = {
    'background-color': '#f4f4f4',
    'padding': '10px',
    'border': '1px solid #ddd',
    'text-align': 'center'
  };


  
}
