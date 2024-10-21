import { Routes } from '@angular/router';
import { EntriesComponent } from './entries/entries.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';

export const routes: Routes = [
    {path: '', component: EntriesComponent},
    {path: 'entries', component: EntriesComponent},
    {path: 'new-entry', component: NewEntryComponent},
    {path: 'delete-entry/:id', component: DeleteEntryComponent}
];
