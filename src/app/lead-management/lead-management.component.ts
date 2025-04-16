import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { KENDO_BUTTON, KENDO_BUTTONGROUP, KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_TOGGLEBUTTONTABSTOP } from '@progress/kendo-angular-common';
import { DropDownsModule, KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_ICONS, KENDO_SVGICON, SVGIcon } from '@progress/kendo-angular-icons';
import { KENDO_SWITCH, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_TOOLBAR, ToolBarModule } from '@progress/kendo-angular-toolbar';
import { alignCenterIcon, alignJustifyIcon, alignLeftIcon, alignRightIcon, boldIcon, downloadIcon, fileExcelIcon, filePdfIcon, italicIcon, paperclipIcon, underlineIcon } from '@progress/kendo-svg-icons';
import { TaskGridComponent } from "../components/task-grid/task-grid.component";
import { TaskGridLayoutComponent } from "../task-grid-layout/task-grid-layout.component";


@Component({
  selector: 'app-lead-management',
  imports: [KENDO_GRID, KENDO_SVGICON, KENDO_TEXTBOX, KENDO_ICONS, KENDO_TEXTBOX, KENDO_DROPDOWNLIST, KENDO_BUTTON, FormsModule, KENDO_TOOLBAR, ToolBarModule, KENDO_BUTTON, KENDO_TOGGLEBUTTONTABSTOP, DropDownsModule, KENDO_BUTTONGROUP, KENDO_SWITCH, TaskGridComponent, TaskGridLayoutComponent],
  templateUrl: './lead-management.component.html',
  styleUrl: './lead-management.component.css'
})
export class LeadManagementComponent {

  

  searchKeyword: string = '';
  
  // Toggle for selecting between international and non-international
  selectedToggle: 'nonIntl' | 'intl' = 'nonIntl';

  // Data for the grid
  gridData: any[] = [
    {
      recordId: 1,
      lastName: 'Smith',
      firstName: 'John',
      email: 'john.smith@example.com',
      phone: '123-456-7890',
      leadId: 'L001',
      appointmentType: 'Consultation',
      bookingAgency: 'Agency A'
    },
    {
      recordId: 2,
      lastName: 'Doe',
      firstName: 'Jane',
      email: 'jane.doe@example.com',
      phone: '987-654-3210',
      leadId: 'L002',
      appointmentType: 'Follow-up',
      bookingAgency: 'Agency B'
    }
    // More data items...
  ];

  // Selected keys for multi-selection
  selectedKeys: any[] = [];

  // Icons for export buttons and formatting actions
  pdfSVG: SVGIcon = filePdfIcon;
  excelSVG: SVGIcon = downloadIcon;
  boldSVG: SVGIcon = boldIcon;
  italicSVG: SVGIcon = italicIcon;
  underlineSVG: SVGIcon = underlineIcon;
  alignLeftSVG: SVGIcon = alignLeftIcon;
  alignCenterSVG: SVGIcon = alignCenterIcon;
  alignRightSVG: SVGIcon = alignRightIcon;
  alignJustifySVG: SVGIcon = alignJustifyIcon;

  // Event handler for toggle change (intl/nonIntl)
  onToggleChange(event: any): void {
    this.selectedToggle = event.checked ? 'intl' : 'nonIntl';
    console.log('Selected toggle:', this.selectedToggle);
  }

  // Search method to handle search functionality
  onSearch(): void {
    console.log('Search keyword:', this.searchKeyword);
    // Implement your actual search logic here
  }

  // Export to Excel method
  exportToExcel(): void {
    console.log('Exporting to Excel...');
    // Implement the actual Excel export functionality here
  }

  // Method to trigger row editing (you can customize this)
  editRow(dataItem: any) {
    console.log('Editing row:', dataItem);
    // Implement the actual editing logic here (e.g., show a modal or inline editing)
  }

  // Method for performing actions on row (e.g., "Details" button)
  performAction(dataItem: any) {
    console.log('Performing action for:', dataItem);
    // Implement action logic here
  }

  // Handling cell click event (e.g., for editing)
  onCellClick(event: any) {
    console.log('Cell clicked:', event);
    // Implement your cell click logic (e.g., toggle editing mode or show details)
  }

  // Filter logic to search through grid data
  onFilter(value: string) {
    // Filter grid data based on search keyword
    if (value) {
      this.gridData = this.gridData.filter(item => 
        item.firstName.toLowerCase().includes(value.toLowerCase()) || 
        item.lastName.toLowerCase().includes(value.toLowerCase()) || 
        item.email.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      // Reset grid data if search is cleared
      this.gridData = [
        { id: 1, firstName: 'Lead 1', lastName: 'Description for lead 1' },
        { id: 2, firstName: 'Lead 2', lastName: 'Description for lead 2' }
      ];
    }
  }

  // Toggle Board View (optional for view changes)
  onBoardViewChange(event: any): void {
    const isChecked = event.target.checked;
    console.log('Board View toggled:', isChecked);
    // Implement board view toggling logic here
  }
}
