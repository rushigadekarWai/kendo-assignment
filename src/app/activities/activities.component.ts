import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KendoInput } from '@progress/kendo-angular-common';
import { CellCloseEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { Lead, LeadsService } from './leads.service';
import { Subscription } from 'rxjs';


// const createFormGroup = (dataItem) =>
//   new FormGroup({
//     id: new FormControl(dataItem.id),
//     FirstName: new FormControl(dataItem.FirstName, Validators.required),
//     LastName: new FormControl(dataItem.LastName),
//     Email: new FormControl(dataItem.Email, Validators.email),
//     Phone: new FormControl(dataItem.Phone),
//     StatusID: new FormControl(dataItem.StatusID),
//     AssignedTo: new FormControl(dataItem.AssignedTo),
//     LeadSource: new FormControl(dataItem.LeadSource),
//     CompanyName: new FormControl(dataItem.CompanyName),
//     Notes: new FormControl(dataItem.Notes),
//     LeadScore: new FormControl(dataItem.LeadScore),
//     IsQualified: new FormControl(dataItem.IsQualified),
//   });


@Component({
  selector: 'app-activities',
  imports: [KENDO_INPUTS, KENDO_GRID, KENDO_DROPDOWNBUTTON, KENDO_APPBAR, ReactiveFormsModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {

  public leads: Lead[] = [];
  public view: Lead[] = []; // This is what the Kendo grid binds to
  public formGroup!: FormGroup;
  private editedRowIndex!: number;
  private isNew = false;

  constructor(private leadService: LeadsService) {}
  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.leadService.getLeads().subscribe((data) => {
      this.leads = data;
      this.view = [...this.leads]; // If you need to use state for sorting/filtering later
    });
  }



  
}
