import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';

interface DialogData {
  Description: string;
  IsExpense: boolean;
  Value: number;
  Id: number;
}

@Component({
  selector: 'app-update-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-entry.component.html',
  styleUrl: './update-entry.component.css'
})
export class UpdateEntryComponent {
  form: FormGroup;
  id: number;
  types: Type[] = [
    {value: true, display: 'Expense'},
    {value: false, display: 'Income'},
  ]

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData, 
    private service: EntryService
  ) {
    this.id = data.Id;
    this.form = fb.group({
      description: [data.Description, Validators.required],
      isExpense: [data.IsExpense, Validators.required],
      value: [data.Value, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.form.value.id = this.id;
    this.service.updateEntry(this.id, this.form.value).subscribe((data) => {
      console.log('Response data: ', data);
    })
  }
}