export const apiBaseUrl = 'http://localhost:3010/api';
//cannot get localhost:3010 to work even though it is IDENTICAL IN EVERY WAY
// ssn will not render until page is manually refreshed
//SOLVED: It was patientService.ts. Removing the 'entries' param from 'getSecurePatient' resolved this.