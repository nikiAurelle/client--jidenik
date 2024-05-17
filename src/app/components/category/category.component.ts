import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from "@angular/router";
import { EntityService } from "../../services/entity.service";
import { getEntityPorperties } from "../../helpers/helpers";
import { routes } from "../../helpers/route";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  pagePath: String = "";
  pageName: String = "";
  pageNumber: Number = 1;
  pageLimit: Number = 5;
  datas: any;
  result: any;
  entityNames: Array<String> = [];
  entityNamesAll: Array<String> = [];
  isLoading: Boolean = true;
  query: String = ""
  routes: Array<any> = routes;
  displaySelectionBox:Boolean =  false
  categories: any;

  constructor(private route: ActivatedRoute, private entityService: EntityService) { }


  ngOnInit() {
    this.entityService.getDatas("category").subscribe({
     next: (data: any) => {
        if (data) {
          this.isLoading = false;
          this.datas = data;
          this.result = data;
        }
        this.categories = this.result
      }
    });
  }

  setDisplaySelectionBox(){
    this.displaySelectionBox = !this.displaySelectionBox;
  }
}
