import { FormControl, FormGroup, Validators } from '@angular/forms';

export const createFormGroup = (dataItem: any) =>
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
    IsQualified: new FormControl(dataItem.IsQualified !== undefined ? dataItem.IsQualified : false),
    CreatedDate: new FormControl(dataItem.CreatedDate ? new Date(dataItem.CreatedDate) : new Date()),
  });
