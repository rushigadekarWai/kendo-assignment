import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Lead {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  StatusID: number;
  AssignedTo: string;
  LeadSource: string;
  id: string;  // Use 'id' instead of 'LeadID'
}

interface Status {
  StatusID: number;
  StatusName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http:HttpClient) {}
  private leadsUrl = 'http://localhost:3000/leads';
  private statusesUrl = 'http://localhost:3000/statuses';

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.leadsUrl);
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusesUrl);
  }

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.leadsUrl, lead);
  }

  updateLead(id: number, lead: any): Observable<any> {
    return this.http.put(`http://localhost:3000/leads/${id}`, lead);
  }
  

  removeLead(id: string): Observable<void> {
    return this.http.delete<void>(`${this.leadsUrl}/${id}`);
  }
  
}
