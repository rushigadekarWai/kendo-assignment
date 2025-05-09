import { Component, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CellClickEvent, GridComponent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { Lead, LeadsService } from './leads.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { menuIcon, paperclipIcon, searchIcon } from '@progress/kendo-svg-icons';
import { KENDO_ICONS, KENDO_SVGICON } from '@progress/kendo-angular-icons';

const createFormGroup = (dataItem: any) =>
  new FormGroup({
    id: new FormControl(dataItem.id || null),
    FirstName: new FormControl(dataItem.FirstName || '', Validators.required),
    LastName: new FormControl(dataItem.LastName || '', Validators.required),
    Email: new FormControl(dataItem.Email || '', [
      Validators.required,
      Validators.email,
    ]),
    Phone: new FormControl(dataItem.Phone || '', [
      Validators.pattern("^[0-9\\-\\+]{9,15}$")
    ]),
    CompanyName: new FormControl(dataItem.CompanyName || ''),
    LeadSource: new FormControl(dataItem.LeadSource || ''),
    AssignedTo: new FormControl(dataItem.AssignedTo || ''),
   StatusID: new FormControl(dataItem.StatusID, Validators.required),

    LeadScore: new FormControl(dataItem.LeadScore || 0, [
      Validators.min(0),
      Validators.max(100),
    ]),
    IsQualified: new FormControl(dataItem.IsQualified || false),
    CreatedDate: new FormControl(dataItem.CreatedDate ? new Date(dataItem.CreatedDate) : new Date()),
    

      

  });
  function formatDateForInput(date: any): string {
    const d = new Date(date || new Date());
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // ensure 2 digits
    const day = (`0${d.getDate()}`).slice(-2);        // ensure 2 digits
    return `${year}-${month}-${day}`;
  }

const matches = (el: any, selector: any) =>
  (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
  selector: 'app-activities',
  imports: [KENDO_GRID, KENDO_INPUTS, KENDO_APPBAR, ReactiveFormsModule, FormsModule, NgIf, KENDO_TEXTBOX, KENDO_DROPDOWNLIST],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  @ViewChild(GridComponent) private grid!: GridComponent;
  public isNew = false;
  public leads: Lead[] = [];
  public statuses: any[] = [];
  public view: Lead[] = [];
  public isInEditingMode = false;
  private editedRowIndex: number | null = null; 
  isNonIntl = false;
  private docClickSubscription: Subscription = new Subscription();
  // public formGroup:any = FormGroup;
  public formGroup: FormGroup<any> | null = null;

  // public formGroup: FormGroup<any> | null = null;

  onRowEdit(event:any) {
  const row = event.sender.element.find('tr');
  row.addClass('editing');
}

onSaveEdit(event: any) {
  const row = event.sender.element.find('tr');
  row.removeClass('editing');
}


public icons = { paperclip: paperclipIcon,
  searchIcon: searchIcon,
  menuIcon: menuIcon

 };

  constructor(private leadService: LeadsService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadLeads();
    this.docClickSubscription.add(
      this.renderer.listen("document", "click", this.onDocumentClick.bind(this))
    );
     this.loadStatus();
  }

  loadLeads(): void {
    this.leadService.getLeads().subscribe((data) => {
      this.leads = data;
      this.view = [...this.leads];
    });
  }
  loadStatus() {
    this.leadService.getStatuses().subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }

  ngOnDestroy(): void {
    this.docClickSubscription.unsubscribe();
  }
  // statusName(id: number): string {
  //   return this.statuses.find((x) => x.StatusID === id)?.StatusName || '';
  // }
  statusName(id: number): string {
  const status = this.statuses.find((x) => x.StatusID === id);
  if (status) {
    return status.StatusName;
  }
  console.warn(`StatusID ${id} not found`);
  return '';  // Fallback to empty string
}



  public addHandler(): void {
    this.closeEditor();
    if (this.formGroup) {
      return; // Prevent adding a new row if formGroup already exists
    }
    this.formGroup = createFormGroup({
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      CompanyName: '',
      LeadSource: '',
      AssignedTo: '',
      LeadScore: 0,
      IsQualified: false,
      CreatedDate: new Date(),
     StatusID: new FormControl(1, Validators.required),
    });

    this.isNew = true;
    // this.isInEditingMode = true;
    this.grid.addRow(this.formGroup);
  }

  // public saveRow(): void {
  //   if (this.formGroup && this.formGroup.valid) {
  //     this.saveCurrent();
  //   }
  // }
  public saveRow(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
      this.formGroup = null; // Clear formGroup after saving
    } else {
      console.warn("Form invalid", this.formGroup?.errors);
    }
    // console.log("Saving lead:", this.formGroup.value);  // 👈 Should now show `id`

  }

  public cellClickHandler({
    isEdited,
    dataItem,
    rowIndex,
  }: CellClickEvent): void {
    console.log("Editing dataItem:", dataItem);  // 👈 Should include `id`

    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      rowIndex += 1;
    }

    this.saveCurrent();

    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    // this.isInEditingMode = true;
    this.grid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex?? undefined);

    this.isNew = false;
    this.editedRowIndex = null;
    // this.isInEditingMode = false;
    this.formGroup = null;
  }

  private onDocumentClick(e: any): void {
    if (this.formGroup && this.formGroup.valid &&
        !matches(e.target, '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button')) {
        this.saveCurrent();
    }
}


  private saveCurrent(): void {
    // if (this.formGroup && this.formGroup.valid) {
    //   const leadData = this.formGroup.value;

    //   this.leadService.save(leadData, this.isNew).subscribe({
    //     next: () => {
    //       this.loadLeads();
    //       this.closeEditor();
    //     },
    //     error: (err) => {
    //       console.error('Error saving lead:', err);
    //     }
    //   });
    // }

    if(this.formGroup){
      const leadData = this.formGroup.value;
      this.leadService.save(leadData, this.isNew).subscribe({
        next: () => {
          this.loadLeads();
          this.closeEditor();
        },
        error: (err) => {
          console.error('Error saving lead:', err);
        }
      });
      
    }
  }




  public onFilter(inputValue: string): void {
    

    // this.dataBinding.skip = 0;
  }

  public searchTerm = '';
public selectedSource: string | null = null;
public selectedUser: string | null = null;

public leadSources: string[] = ['Web', 'Email', 'Phone']; // example
public assignedUsers: string[] = ['Alice', 'Bob', 'Charlie']; // example

onSearchChange(): void {
  this.applyFilters();
}

onSourceFilterChange(value: string): void {
  this.applyFilters();
}

onUserFilterChange(value: string): void {
  this.applyFilters();
}

clearFilters(): void {
  this.searchTerm = '';
  this.selectedSource = null;
  this.selectedUser = null;
  this.applyFilters();
}

applyFilters(): void {
  this.view = this.leads.filter(lead =>
    (!this.searchTerm || lead.FirstName?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    (!this.selectedSource || lead.LeadSource === this.selectedSource) &&
    (!this.selectedUser || lead.AssignedTo === this.selectedUser)
  );
}

savePreferences(): void {
  console.log('Saved user preferences:', {
    source: this.selectedSource,
    user: this.selectedUser,
    search: this.searchTerm,
  });
}

}
