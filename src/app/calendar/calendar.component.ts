import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { KENDO_BUTTON, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_TOGGLEBUTTONTABSTOP, KendoInput } from '@progress/kendo-angular-common';
import { DropDownListComponent, DropDownsModule, KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { ExcelExportComponent, ExcelExportData, KENDO_EXCELEXPORT } from '@progress/kendo-angular-excel-export';
import { CreateFormGroupArgs, EditEvent, GridComponent, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, RemoveEvent, SaveEvent, TemplateEditingDirective } from '@progress/kendo-angular-grid';
import { IconsModule, KENDO_ICONS, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { KENDO_CHECKBOX, KENDO_INPUTS, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_AVATAR, KENDO_GRIDLAYOUT, KENDO_TABSTRIP, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
import { Product } from "./model";
import { products } from "./products";
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { ProductService } from './product.service';
import { menuIcon, paperclipIcon, searchIcon } from '@progress/kendo-svg-icons';
import { KENDO_TREEVIEW } from '@progress/kendo-angular-treeview';
import { ActivitiesComponent } from "../activities/activities.component";

@Component({
  selector: 'app-calendar',
  imports: [
    DropDownsModule,
    ReactiveFormsModule,
    IconsModule,
    KENDO_AVATAR,
    LayoutModule,
    IndicatorsModule,
    KENDO_TABSTRIP,
    KENDO_DROPDOWNBUTTON,
    KENDO_DROPDOWNLIST,
    DropDownsModule,
    KENDO_DROPDOWNBUTTON,
    TemplateEditingDirective,
    KENDO_ICONS,
    KENDO_BUTTON,
    KENDO_BUTTONS,
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
    KENDO_TOGGLEBUTTONTABSTOP, DropDownsModule, KENDO_CHECKBOX, KENDO_TEXTBOX, KENDO_DIALOG, KENDO_DROPDOWNBUTTON, KENDO_GRID_EXCEL_EXPORT, KENDO_EXCELEXPORT, KENDO_ICONS, NgIf, KENDO_TREEVIEW, ReactiveFormsModule,
    ActivitiesComponent
],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {


  // public products: unknown[] = products;
  public products: any[] = []; // or Product[] if you have a model
  isNonIntl = false;
  // public gridData: any[] = []; 
  public filteredProducts: any[] = [];
  public selectedField: string = 'FirstName';     // Data shown in grid (filtered)
   // Bound to input box
   public searchKeyword: string = '';


   onSearchChange(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
  
    if (!keyword) {
      // If search is empty, show all
      this.filteredProducts = [...this.products];
      return;
    }
  
    this.filteredProducts = this.products.filter(item =>
      item.FirstName?.toLowerCase().includes(keyword) ||
      item.LastName?.toLowerCase().includes(keyword) ||
      item.ProductName?.toLowerCase().includes(keyword) ||
      item.PrimaryEmail?.toLowerCase().includes(keyword) ||
      item.PrimaryPhone?.toLowerCase().includes(keyword) ||
      item.AppointmentType?.toLowerCase().includes(keyword) ||
      item.SalesRep?.toLowerCase().includes(keyword) ||
      item.BookingAgency?.toLowerCase().includes(keyword)
    );
  }









ngOnInit(): void {
  this.getProducts();
}
getProducts() {
  this.productService.getProducts().subscribe(
    (data) => {
      console.log(data);  // This should log the response from the API
      this.products = data; 
      this.filteredProducts = [...data];
       // Make sure this line is not commented out
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}

  createNewProduct(): Product {
   
    return new Product();
  }


  public searchTerm: string = '';
// public selectedField: string = '';
 // customize as per your model

//  onSearch(): void {
//     const term = this.searchTerm.toLowerCase();

//     this.products = this.products.filter(product =>
//       Object.values(product).some(val =>
//         String(val).toLowerCase().includes(term)
//       )
//     );
//   }
// onSearch(): void {
//   const term = this.searchTerm.trim().toLowerCase();

//   if (!term) {
//     this.filteredProducts = [...this.products]; // Show all when search is cleared
//     return;
//   }

//   this.filteredProducts = this.products.filter(product =>
//     product[this.selectedField]?.toLowerCase().includes(term)
//   );
// }

// onSearch(): void {
//   const term = this.searchTerm.toLowerCase();

//   this.products = this.products.filter(product => {
//     if (this.selectedField && this.selectedField !== 'Search All Fields') {
//       // Filter by specific field
//       const fieldValue = product[this.selectedField];
//       return fieldValue?.toString().toLowerCase().includes(term);
//     } else {
//       // Search all fields
//       return Object.values(product).some(val =>
//         val?.toString().toLowerCase().includes(term)
//       );
//     }
//   });
// }


  // public selectedItems: any[] = [];
  // public selectedItems: any[] = [];

// onSelectionChange(event: any): void {
//   this.selectedItems = event.selectedRows.map((row:any) => row.dataItem);
//   console.log('Selected rows:', this.selectedItems);
// }



  onSaveHandler({ dataItem, isNew }: { dataItem: any; isNew: boolean }): void {
    if (isNew) {
      // Create new product
      this.productService.createProduct(dataItem).subscribe({
        next: (response) => {
          console.log('Product created:', response);
          this.getProducts();  // Refresh the grid
        },
        error: (error) => {
          console.error('Error creating product:', error);
        }
      });
    } else {
      // Update existing product
      this.productService.updateProduct(dataItem).subscribe({
        next: (response) => {
          console.log('Product updated:', response);
          this.getProducts();  // Refresh the grid
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
  
  onRemoveHandler(dataItem: any): void {
    this.productService.removeProduct(dataItem.id).subscribe({
      next: () => {
        console.log('Product removed');
        this.getProducts();  // Refresh the grid
      },
      error: (error) => {
        console.error('Error removing product:', error);
      }
    });
  }
  








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

  commandColumnStyles = {
    'background-color': '#f4f4f4',
    'padding': '10px',
    'border': '1px solid #ddd',
    'text-align': 'center'
  };
// Example actions for the dropdown
userSettingsData = [
  { text: 'Profile', value: 'profile' },
  { text: 'Account Settings', value: 'account' },
  { text: 'Logout', value: 'logout' }
];

// Add your logic for handling dropdown actions
onDropdownSelect(event: any) {
  console.log('Selected option:', event.item);
}

// Variable to track which dropdown is open

// listItems = ['All leads', 'Select', 'Save Preferences'];
// searchKeyword!: string;
// Handle the dropdown value change
onDropdownChange(event: any) {
  console.log('Selected dropdown value:', event);
  // Handle the dropdown value change logic here
}

// Handle the search input
onSearchInput(event: any) {
  const searchText = event.target.value;
  console.log('Search text:', searchText);
  // Implement your search logic here
}

// Handle toggle view button
onToggleView() {
  console.log('Toggled view');
  // Implement toggle view logic (e.g., switch between grid and list view)
}

// Handle clear filter button
onClearFilter() {
  console.log('Filters cleared');
  // Implement clear filter logic (reset filter state)
}

// Handle bulk edit button
onBulkEdit() {
  console.log('Bulk edit initiated');
  // Implement bulk edit logic
}

// Handle save preferences button
onSavePreferences() {
  console.log('Preferences saved');
  // Implement save preferences logic
}

// Handle menu button click
onMenuClick() {
  console.log('Menu clicked');
  // Implement menu actions (could be opening a side menu, etc.)
}
  


constructor(private productService: ProductService){

}


leadOptions: string[] = ['All Leads', 'New Leads', 'Contacted', 'Qualified'];
  selectedLead: string = 'All Leads';

  savedPreferences: string[] = ['Last Used', 'My Filters', 'Top Rated'];
  selectedPreference: string = 'Select Saved Preferences';

  // Search Keyword
  // searchTerm: string = '';

  // Intl Toggle
  selectedIntl: 'non-intl' | 'intl' = 'non-intl';

  

  // Search Click Handler
  // onSearch(): void {
  //   console.log('Search Term:', this.searchTerm);
  //   console.log('Lead Filter:', this.selectedLead);
  //   console.log('Saved Preference:', this.selectedPreference);
  //   console.log('International Filter:', this.selectedIntl);

  //   // Call your API or apply filter logic here
  // }

  // Clear Filters
  clearFilters(): void {
    this.selectedLead = 'All Leads';
    this.selectedPreference = 'Select Saved Preferences';
    this.searchTerm = '';
    this.selectedIntl = 'non-intl';

    console.log('Filters cleared');
    // Apply filter reset logic here
  }

  // Bulk Edit
  bulkEdit(): void {
    console.log('Bulk edit triggered');
    // Open bulk edit modal or perform bulk actions
  }

  // Save Preferences
  savePreferences(): void {
    console.log('Saving preferences...');
    // Save current selections to backend or localStorage
  }

  // Handle toggle change (Optional)
  onIntlToggle(type: 'non-intl' | 'intl'): void {
    this.selectedIntl = type;
    console.log('Selected Toggle:', type);
  }



  @ViewChild(ExcelExportComponent) excelexport!: ExcelExportComponent;
  @ViewChild(GridComponent) grid: GridComponent | undefined;
 

  exportToExcel() {
    this.excelexport.save();  // Trigger export to Excel
  }
  // Optional: Customize the Excel export data if needed
  exportExcelData(e: ExcelExportData) {
  console.log(e);  // Log the data being exported
  // You can modify e here if needed
}

public icons = { paperclip: paperclipIcon,
  searchIcon: searchIcon,
  menuIcon: menuIcon

 };


 selectedItem: any = null;

 // Example data for the Treeview
 
//  
 public areaData:any[] = [
  {
    text: "View Edits",
    id: 1,
    areas: [
      { text: "Edit", id: 4 },
      { text: "Delete", id: 3 },
                                                      
    ],
  },
  {
    text: "View Leads",
    id: 6,
    areas: [
      { text: "Details", id: 7 },
      { text: "Projects", id: 10 },
      
    ],
  },
];
onEdit(item: any): void {
  console.log('Clicked Edit for:', item);
  // Add logic here for modal or form navigation
}
rowIndexToEdit: number | null = null;






}
