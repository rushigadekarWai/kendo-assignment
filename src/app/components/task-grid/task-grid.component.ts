import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { KENDO_BUTTON, KENDO_BUTTONGROUP, KENDO_BUTTONS, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_TOGGLEBUTTONTABSTOP, KendoInput } from '@progress/kendo-angular-common';
import { DropDownListComponent, DropDownsModule, KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { CreateFormGroupArgs, EditEvent, GridModule, KENDO_GRID, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { IconsModule, KENDO_ICONS, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { KENDO_CHECKBOX, KENDO_INPUTS, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_AVATAR, KENDO_GRIDLAYOUT, KENDO_TABSTRIP, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { KENDO_TOOLBAR } from '@progress/kendo-angular-toolbar';
// import { Product } from "./model";
// import { products } from "./products";
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { ProductService } from '../../calendar/product.service';
import { Product } from '../../task-grid-layout/model';

@Component({
  selector: 'app-task-grid',
  standalone: true,
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
    KENDO_TOGGLEBUTTONTABSTOP, DropDownsModule, KENDO_CHECKBOX, KENDO_TEXTBOX,KENDO_DIALOG, KENDO_DROPDOWNBUTTON, 
    
  ],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.css'
})
export class TaskGridComponent {

  
  
   
   
     // public products: unknown[] = products;
     public products: any[] = []; // or Product[] if you have a model
   
   
     // productsdata = [];
   
   ngOnInit(): void {
     this.getProducts();
   }
   getProducts() {
     this.productService.getProducts().subscribe(
       (data) => {
         console.log(data);  // This should log the response from the API
         this.products = data;  // Make sure this line is not commented out
       },
       (error) => {
         console.error('Error fetching products:', error);
       }
     );
   }
   
     createNewProduct(): Product {
      
       return new Product();
     }
   
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
   searchKeyword!: string;
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
   
   
   
}
