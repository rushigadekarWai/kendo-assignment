import { Component, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CellClickEvent, GridComponent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { Lead, LeadsService } from './leads.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { KENDO_DROPDOWNLIST, KENDO_DROPDOWNTREE } from '@progress/kendo-angular-dropdowns';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { menuIcon, paperclipIcon, searchIcon } from '@progress/kendo-svg-icons';
import { KENDO_ICONS, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { ColumnBase, ColumnComponent } from '@progress/kendo-angular-excel-export';
import { createFormGroup } from './form-utils';
import { ChildProcess } from 'node:child_process';
import { process } from '@progress/kendo-data-query';


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
  imports: [KENDO_GRID, KENDO_INPUTS, KENDO_APPBAR, ReactiveFormsModule, FormsModule, NgIf, KENDO_TEXTBOX, KENDO_DROPDOWNLIST, KENDO_DROPDOWNTREE],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  // @ViewChild(GridComponent) private grid!: GridComponent;
  public isNew = false;
  public leads: Lead[] = [];
  public statuses: any[] = [];
  public view: Lead[] = [];
  public isInEditingMode = false;
  private editedRowIndex: number | null = null; 
  isNonIntl = false;
  private docClickSubscription: Subscription = new Subscription();
  public formGroup: FormGroup<any> | null = null;
  public displayedColumns: any[] = [];

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
      this.savedPreferences = Object.keys(localStorage); 
    
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
      // console.log(this.statuses);
    });
  }

  ngOnDestroy(): void {
    this.docClickSubscription.unsubscribe();
  }

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
      IsQualified: new FormControl(false),
      CreatedDate: new Date(),
      StatusID: new FormControl(1, Validators.required),
    });

    this.isNew = true;
    this.grid.addRow(this.formGroup);
  }

  public saveRow(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
      this.formGroup = null; // Clear formGroup after saving
    } else {
      console.warn("Form invalid", this.formGroup?.errors);
    }
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

    this.closeEditor()
  //    if (this.formGroup) {
  //   this.saveCurrent();
  // }

    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    this.grid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex ?? undefined);

    this.isNew = false;
    this.editedRowIndex = null;
    this.formGroup = null;
  }

  private onDocumentClick(e: any): void {
    if (this.formGroup && this.formGroup.valid &&
        !matches(e.target, '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button')) {
        this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
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
   public LeadItems: Array<string> = ["Item 1", "Item 2", "Item 3"];

  public listItems: Array<string> = [
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Football",
    "Table Tennis",
    "Tennis",
    "Volleyball",
  ];


   public savedPreferences: string[] = [];  // Array to hold saved preference names
  public selectedPreference: string = '';

  //  public savedPreferences: string[] = [];

    @ViewChild('grid') grid!: GridComponent;

    public columns: any[] = [];
  clearFilters(): void {}

   savePreferences(grid: GridComponent): void {
   const columns: any[] = grid.columns.toArray();

   console.log(columns)
    //the ordered Grid columns as per their orderIndex
    const orderedColumns: any[] = columns.sort(
      (a, b) => a.orderIndex - b.orderIndex
    );

   
    }

    loadColumnOrder(){}







      public value: any;
public searchValue: string = '';
    onFilter(inputValue: string): void {
  this.view = process(this.leads, {
  filter: {
    logic: "or",
    filters: [
      { field: "FirstName", operator: "contains", value: inputValue },
      { field: "LastName", operator: "contains", value: inputValue },
      { field: "Email", operator: "contains", value: inputValue },
      // { field: "Phone", operator: "contains", value: inputValue },
      { field: "CompanyName", operator: "contains", value: inputValue },
      { field: "LeadSource", operator: "contains", value: inputValue },
      { field: "AssignedTo", operator: "contains", value: inputValue }
    ]
  }
}).data;

}




  }

  // This method loads the selected column order from localStorage
  



  


  







