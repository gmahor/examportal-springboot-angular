package com.examportal.examportalbackend.controller;

import java.util.List;

import com.examportal.examportalbackend.entity.exam.Category;
import com.examportal.examportalbackend.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    
    // add category
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    // get single category
    @GetMapping("/{catId}")
    public ResponseEntity<?> getCategory(@PathVariable("catId")Long categoryId){
        Category categoryById = this.categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(categoryById);
    }

    // get all categories
    @GetMapping("/")
    public List<Category> allCategories(){
        return this.categoryService.getAllCategories();
    } 
  
    // update category
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category ){
        return this.categoryService.updateCategory(category);
    }

    // delete category
    @DeleteMapping("/{catid}")
    public void deleteCategory(@PathVariable("catid") Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }
    




}
