import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // load all the categories

  public categories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  // add category
  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/category/`, category);
  }

  // delete category
  public deleteCategory(id: any) {
    return this.http.delete(`${baseUrl}/category/` + id);
  }

  // get category
  public getCategory(cId: any) {
    return this.http.get(`${baseUrl}/category/${cId}`);
  }

  // update category
  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/category/`, category);

  }


}
