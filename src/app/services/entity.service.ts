import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }
  getDatas(entityName: String){
    return this.http.get(environment.apiUrl+entityName)
  }

  getDatasByPage(entityName: String, pageNumber: Number =1, pageLimit:Number =5){
    return this.http.get(environment.apiUrl+entityName+"/by/page?pageNumber="+pageNumber+"&pageLimit="+pageLimit)
  }

   getDatasById(entityName: String, id:String){
    return this.http.get(environment.apiUrl+entityName+"/"+id)
  }

   searchDatasByPage(entityName: String, query: String, pageNumber: Number =1, pageLimit:Number =10){
    return this.http.get(environment.apiUrl+entityName+"/search/page?"+query+"&pageNumber="+pageNumber+"&pageLimit="+pageLimit)
  }
  updateData(entityName: String, entityId: String, data: any){
    console.log(environment.apiUrl+entityName+"/"+entityId, data);
    if (entityName === "product")
      return this.http.put(environment.apiUrl+entityName+"/"+entityId, data.product)
    else
      return this.http.put(environment.apiUrl+entityName+"/"+entityId, data.product)

  }
  deleteDatasById(entityName: String, entityId: String){
    return this.http.delete(environment.apiUrl+entityName+"/"+entityId )
  }
  addData(entityName: String, data: any){

    if (entityName == 'category')
      return this.http.post(environment.apiUrl+entityName, data.category.data)
    else
      return this.http.post(environment.apiUrl+entityName, data.product.data)
  }

}
