import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators ,FormControl} from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 userForms !: FormGroup;
 actionBtn:string="Save";
  constructor(private formBuilder : FormBuilder,
     private service :ServiceService, 
    @Inject(MAT_DIALOG_DATA) public editData :any ,  private dialogRef : MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    this.userForms = this.formBuilder.group({
      username :['',Validators.required],
      useremail :['', Validators.required],
      useRole: ['',Validators.required]
      
    });
    if(this.editData){
      this.actionBtn = "Update"
      this.userForms.controls['username'].setValue(this.editData.username)
      this.userForms.controls['useremail'].setValue(this.editData.useremail)
      this.userForms.controls['useRole'].setValue(this.editData.useRole)
    }
  }
  addUser(){
    // console.log(this.userForms.value)
    if(!this.editData){
      if(this.userForms.valid){
        this.service.postuser(this.userForms.value)
        .subscribe({
          next:(res)=>{
            alert("user added Successfully")
            this.userForms.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            alert("Error while adding user")
          }
        })
      }
    }else {
      this.updateUser();
    }
  }

  updateUser(){
    this.service.putuser(this.userForms.value,this.editData.id)
    .subscribe({
      next:(res) =>{
alert("User Updated Successfully");
this.userForms.reset();
this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while update user data");
      }
    })
  }
}
