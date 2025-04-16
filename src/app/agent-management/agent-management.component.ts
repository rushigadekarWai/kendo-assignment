import { Component, ViewChild } from '@angular/core';
import { DropDownButton, DropDownButtonModule, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { CreateFormGroupArgs, ExcelCommandDirective, ExcelModule, ExcelService, GridComponent, GridModule, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { KENDO_GRIDLAYOUT } from '@progress/kendo-angular-layout';
import { products } from './products';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { KENDO_TEMPLATE_CONTEXT, KendoInput } from '@progress/kendo-angular-common';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { DropDownsModule, KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { CommonModule } from '@angular/common';

import { ExcelExportComponent, ExcelExportModule, KENDO_EXCELEXPORT } from '@progress/kendo-angular-excel-export';
import { fileExcelIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { KENDO_DATE } from '@progress/kendo-angular-intl';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-agent-management',
  imports: [KENDO_GRID, KENDO_GRIDLAYOUT, KENDO_BUTTONGROUP, KENDO_BUTTONGROUP, KENDO_TEMPLATE_CONTEXT, ReactiveFormsModule, KENDO_INPUTS, KENDO_TOOLBAR, GridModule, KENDO_TEMPLATE_CONTEXT, KENDO_TOOLBAR, KENDO_DROPDOWNLIST, KENDO_DROPDOWNBUTTON, KENDO_DROPDOWNS, DropDownButtonModule, DropDownsModule, CommonModule, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_EXCELEXPORT,
KENDO_GRID_EXCEL_EXPORT,ExcelExportModule, ExcelModule, ExcelCommandDirective, FormsModule,KENDO_DATE, KENDO_DATEPICKER
  ],
  providers: [ExcelService],
  templateUrl: './agent-management.component.html',
  styleUrl: './agent-management.component.css'
})
export class AgentManagementComponent {
  public gridData: any[] = products;

  // Form Group: Used for handling form data during grid operations
  public formGroup!: FormGroup;

  // Styling for the Command Column
  public commandColumnStyles = {
    'border-right-width': '0',
    'text-align': 'center',
  };

  // Constructor with FormBuilder to create FormGroup
  constructor(private formBuilder: FormBuilder) {}

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? {} : args.dataItem;
  
    this.formGroup = new FormGroup({
      ProductID: new FormControl(item.ProductID || null), // Ensure ID is included for edit detection
      ProductName: new FormControl(item.ProductName || '', Validators.required),
      FirstName: new FormControl(item.FirstName || ''),
      LastName: new FormControl(item.LastName || ''),
      Category: new FormControl(item.Category || ''),
  
      UnitPrice: new FormControl(item.UnitPrice ?? null),
      QuantityPerUnit: new FormControl(item.QuantityPerUnit || ''),
      UnitsInStock: new FormControl(item.UnitsInStock ?? null),
      UnitsOnOrder: new FormControl(item.UnitsOnOrder ?? 0),
      Discontinued: new FormControl(item.Discontinued ?? false),
      SyncToMobile: new FormControl(item.SyncToMobile ?? false),
  
      SalesRep: new FormControl(item.SalesRep || ''),
      Coordinator: new FormControl(item.Coordinator || ''),
      // AssignedDate: new FormControl(item.AssignedDate || ''),
      AssignedDate: new FormControl(item.AssignedDate ? new Date(item.AssignedDate) : null),
      CreatedSource: new FormControl(item.CreatedSource || ''),
      PrimaryEmail: new FormControl(item.PrimaryEmail || ''),
      PrimaryPhone: new FormControl(item.PrimaryPhone || ''),
      LMPLLeadID: new FormControl(item.LMPLLeadID || ''),
      AppointmentType: new FormControl(item.AppointmentType || ''),
      BookingAgency: new FormControl(item.BookingAgency || '')
    });
  
    return this.formGroup;
  }
  
  // Add New Item to the Grid
  public addNewItem() {
    const newItem = {
      ProductID: null,
      ProductName: '',
      FirstName: '',
      LastName: '',
      Category: '',
      UnitPrice: null,
      QuantityPerUnit: '',
      UnitsInStock: null,
      UnitsOnOrder: 0,
      Discontinued: false,
      SyncToMobile: false,
      SalesRep: '',
      Coordinator: '',
      AssignedDate: '',
      CreatedSource: '',
      PrimaryEmail: '',
      PrimaryPhone: '',
      LMPLLeadID: '',
      AppointmentType: '',
      BookingAgency: ''
    };
  
    this.gridData.unshift(newItem);
    this.formGroup = this.createFormGroup({ isNew: true, dataItem: newItem });
  }
  
  // Save or Update Item
  public saveItem() {
    if (this.formGroup.valid) {
      const editedData = this.formGroup.value;
  
      const index = this.gridData.findIndex(
        item => item.ProductID === editedData.ProductID && editedData.ProductID !== null
      );
  
      if (index >= 0) {
        // Update existing item
        this.gridData[index] = editedData;
      } else {
        // Assign a new ProductID if needed
        const maxId = Math.max(...this.gridData.map(item => item.ProductID || 0), 0);
        editedData.ProductID = maxId + 1;
  
        // Add new item
        this.gridData.unshift(editedData);
      }
  
      this.formGroup.reset(); // Optional: reset form after save
    }
  }
  // Define Dropdown data (used in the grid dropdown button)
  public data = [
    { text: "My Profile" },
    { text: "Friend Requests" },
    { text: "Account Settings" },
    { text: "Support" },
    { text: "Log Out" }
  ];

  // Handle dropdown item click (Action based on selected text)
  onUserSettingClick(event: any): void {
    const selectedText = event.item.text;
  
    switch (selectedText) {
      case "My Profile":
        console.log("Navigate to profile");
        break;
      case "Friend Requests":
        console.log("Show friend requests");
        break;
      case "Account Settings":
        console.log("Open account settings");
        break;
      case "Support":
        console.log("Open support page");
        break;
      case "Log Out":
        console.log("Perform logout");
        break;
    }
  }



  // export to excell work code

  onCreateLead(): void {
    // Open a modal, navigate to form, or reset a form
    console.log("Create Lead button clicked");
    // Example: this.router.navigate(['/create-lead']);
  }
  public fileExcelIcon: SVGIcon = fileExcelIcon;
  
  @ViewChild('excelExport', { static: false }) excelExport!: ExcelExportComponent;
  public exportToExcel(): void {
    this.excelExport.save();
  }
}
