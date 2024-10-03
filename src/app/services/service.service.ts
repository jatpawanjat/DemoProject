import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private  http : HttpClient) { }
  postuser(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data);
  }
  getuser(){
    return this.http.get<any>("http://localhost:3000/posts")
  }
  putuser(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
  }
deleteUser(id:number){ 
  return this.http.delete<any>("http://localhost:3000/posts/"+id);
}

}
