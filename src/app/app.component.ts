import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { ServiceService } from './services/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
 
import {AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Task-App';
  displayedColumns: string[] = ['username','useremail','useRole','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  constructor(private dialog : MatDialog, private service : ServiceService){

  }
  ngOnInit(): void {
    this.getAllUser();
    
  }
  openDialog(){
    this.dialog.open(AddUserComponent, {
     width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getAllUser()
      }
    });
  }
  getAllUser(){
    this.service.getuser().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res) ;
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error this Record")
      }
    })

  }
  editUser(row : any){
    this.dialog.open(AddUserComponent,{
      width:'30%',
      data:row

    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllUser()
      }
    });

  }

  deleteUser(id: number){
    this.service.deleteUser(id).subscribe({
      next:(res)=>{
        alert("user Deleted successfully")
        this.getAllUser();
      },
      error:()=>{alert("Error while deleted user")}
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}