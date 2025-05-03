import { Component, ViewChild } from '@angular/core';
import { DropDownButton, DropDownButtonModule, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { AddEvent, CancelEvent, CreateFormGroupArgs, EditEvent, ExcelCommandDirective, ExcelModule, ExcelService, GridComponent, GridDataResult, GridModule, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { KENDO_GRIDLAYOUT } from '@progress/kendo-angular-layout';
import { products } from './products';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { KENDO_TEMPLATE_CONTEXT, KendoInput } from '@progress/kendo-angular-common';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { DropDownsModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS, KENDO_DROPDOWNTREE } from '@progress/kendo-angular-dropdowns';
import { CommonModule } from '@angular/common';

import { ExcelExportComponent, ExcelExportModule, KENDO_EXCELEXPORT } from '@progress/kendo-angular-excel-export';
import { fileExcelIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { KENDO_DATE } from '@progress/kendo-angular-intl';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';
import { ProductService } from '../calendar/product.service';
import { Observable } from 'rxjs';
import { KENDO_LOADER } from '@progress/kendo-angular-indicators';
import { State } from '@progress/kendo-data-query';
import { Product } from '../task-grid-layout/model';
import { LeadService } from './lead.service';

export interface ProductItem {
  id?: number;              // ID field if needed (optional for new records)
  FirstName: string;
  LastName: string;
  ProductName: string;
  UnitPrice: number;
  Discontinued: boolean;
  UnitsInStock: number;
  AssignedDate: string;     // ISO string or Date object
  SalesRep: string;
  Coordinator: string;
  SyncToMobile: boolean;
  CreatedSource: string;
  PrimaryEmail: string;
  PrimaryPhone: string;
  LMPLLeadID: string;
  AppointmentType: string;
  BookingAgency: string;
}



@Component({
  selector: 'app-agent-management',
  imports: [KENDO_GRID, KENDO_GRIDLAYOUT, KENDO_BUTTONGROUP, KENDO_BUTTONGROUP, KENDO_TEMPLATE_CONTEXT, ReactiveFormsModule, KENDO_INPUTS, KENDO_TOOLBAR, GridModule, KENDO_TEMPLATE_CONTEXT, KENDO_TOOLBAR, KENDO_DROPDOWNLIST, KENDO_DROPDOWNBUTTON, KENDO_DROPDOWNS, DropDownButtonModule, DropDownsModule, CommonModule, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_EXCELEXPORT,
KENDO_GRID_EXCEL_EXPORT,ExcelExportModule, ExcelModule, FormsModule,KENDO_DATE, KENDO_DATEPICKER, KENDO_LOADER, ReactiveFormsModule,KENDO_DROPDOWNTREE
  ],
  providers: [ExcelService],
  templateUrl:'./agent-management.component.html',
  styleUrl: './agent-management.component.css'
})
export class AgentManagementComponent {
  public leads: any[] = [];
  public statuses: any[] = [];
  public formGroup: FormGroup | undefined;
  private editedRowIndex: number | undefined;
  

  constructor(private leadservice: LeadService) {}

  ngOnInit(): void {
    this.loadleads();
    this.loadStatus();
  }

  loadleads() {
    this.leadservice.getLeads().subscribe((data) => {
      this.leads = data;
      console.log(this.leads);
    });
  }

  loadStatus() {
    this.leadservice.getStatuses().subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }

  statusName(id: number): string {
    return this.statuses.find((x) => x.StatusID === id)?.StatusName || '';
  }

  // public addHandler({ sender }: AddEvent): void {
  //   this.closeEditor(sender);
  //   this.formGroup = this.createFormGroup({
  //     FirstName: '',
  //     LastName: '',
  //     Email: '',
  //     Phone: '',
  //     StatusID: 1,
  //     AssignedTo: '',
  //     LeadSource: ''
  //   });
  //   sender.addRow(this.formGroup);
  // }
  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl(''),
      Phone: new FormControl(''),
      StatusID: new FormControl(1, Validators.required),
      AssignedTo: new FormControl(''),
      LeadSource: new FormControl(''),
      CompanyName: new FormControl('Unknown'),  // Default to 'Unknown'
    CreatedDate: new FormControl(new Date().toISOString()),  // Default to current date
    Notes: new FormControl('No notes provided.'),  // Default to 'No notes provided.'
    LeadScore: new FormControl(0),  // Default to 0
    IsQualified: new FormControl(false)  // Default to false
      // ❌ Do NOT include id here
    });
    sender.addRow(this.formGroup);
  }
  

  public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const lead = formGroup.value;
  
    if (isNew) {
      this.leadservice.addLead(lead).subscribe(() => {
        this.loadleads(); // Reload leads after adding
      });
    } else {
      const leadID = lead.id;
      if (leadID) {
        this.leadservice.updateLead(leadID, lead).subscribe(() => {
          this.loadleads(); // Reload leads after updating
        });
      } else {
        console.error('Missing ID for lead update.');
      }
    }
  
    sender.closeRow(rowIndex);
  }
  

  public removeHandler({ dataItem }: RemoveEvent): void {
    const leadId = dataItem.id; // Make sure 'id' exists
    this.leadservice.removeLead(leadId).subscribe(() => this.loadleads());
  }
  

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private createFormGroup(dataItem: any): FormGroup {
    return new FormGroup({
      id: new FormControl(dataItem.id),  // Even if not required for adding, it's needed for editing
      FirstName: new FormControl(dataItem.FirstName, Validators.required),
      LastName: new FormControl(dataItem.LastName, Validators.required),
      Email: new FormControl(dataItem.Email),
      Phone: new FormControl(dataItem.Phone),
      StatusID: new FormControl(dataItem.StatusID, Validators.required),
      AssignedTo: new FormControl(dataItem.AssignedTo),
      LeadSource: new FormControl(dataItem.LeadSource),
      CompanyName: new FormControl(dataItem.CompanyName || 'Unknown'),  // Default to 'Unknown' if not provided
    CreatedDate: new FormControl(dataItem.CreatedDate || new Date().toISOString()),  // Default to current date if not provided
    Notes: new FormControl(dataItem.Notes || 'No notes provided.'),  // Default to 'No notes provided.' if not provided
    LeadScore: new FormControl(dataItem.LeadScore || 0),  // Default to 0 if not provided
    IsQualified: new FormControl(dataItem.IsQualified !== undefined ? dataItem.IsQualified : false)  // Default to false if not provided
    });
  }
  




  areaData = [
    {
      id: 1,
      text: 'Option 1',
      areas: [
        { id: 11, text: 'Sub-option 1-1' },
        { id: 12, text: 'Sub-option 1-2' },
      ],
    },
    {
      id: 2,
      text: 'Option 2',
      areas: [
        { id: 21, text: 'Sub-option 2-1' },
        { id: 22, text: 'Sub-option 2-2' },
      ],
    },
  ];
  
}