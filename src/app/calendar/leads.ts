export interface Lead {
  LeadID: number;
  LeadTitle: string;
  FirstName: string;
  LastName: string;
  Status: string;
  SalesRep: string;
  Coordinator: string;
  FirstOrderedOn: Date;
  CreatedSource: string;
  PrimaryEmail: string;
  PrimaryPhone: string;
  AppointmentType: string;
  BookingAgency: string;
}
// src/app/data/leadsData.ts
export const leadsData = [
  {
    id: 1,
    leadId: 'LMPL1234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-202-555-0171',
    product: 'Insurance Plan A',
    salesRep: 'Alice',
    coordinator: 'Bob',
    assignedDate: new Date('2024-03-01'),
    followUpDate: new Date('2024-04-01'),
    source: 'Website',
    status: 'In Progress',
    appointmentType: 'Phone Call',
    bookingAgency: 'Agency A',
    syncToMobile: true,
    city: 'New York',
    state: 'NY',
    leadStatus: 'Active', // New field
  },
  {
    id: 2,
    leadId: 'LMPL1235',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1-202-555-0134',
    product: 'Insurance Plan B',
    salesRep: 'Charlie',
    coordinator: 'Diana',
    assignedDate: new Date('2024-03-10'),
    followUpDate: new Date('2024-04-05'),
    source: 'Referral',
    status: 'Contacted',
    appointmentType: 'In-Person',
    bookingAgency: 'Agency B',
    syncToMobile: false,
    city: 'Chicago',
    state: 'IL',
    leadStatus: 'Inactive', // New field
  },
  // Add more leads with the leadStatus field here
];
