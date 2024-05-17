import {Product} from "../models/product";
import {Category} from "../models/category";
import {Order} from "../models/order";
import {Contact} from "../models/contact";
import {User} from "../models/user";

export const getEntityPorperties = (entity: String): Array<String> =>{
  let results: any = []
  let entityClass: any;
  if(entity == "product"){
    entityClass = new Product()
  }
  if(entity == "category"){
    entityClass = new Category()
  }
   if(entity == "user"){
    entityClass = new User()
  }
  if(entity == "order"){
    entityClass = new Order()
  }
   if(entity == "contact"){
    entityClass = new Contact()
  }
   if(entityClass){
     results = Object.keys(entityClass)
   }
  return results
}

export const getEntity = (entity: String) =>{

  let entityClass: any;

  if(entity == "product"){
    entityClass = new Product()
  }
  if(entity == "category"){
    entityClass = new Category()
  }
   if(entity == "user"){
    entityClass = new User()
  }
  if(entity == "order"){
    entityClass = new Order()
  }
   if(entity == "contact"){
    entityClass = new Contact()
  }

  return entityClass
}
