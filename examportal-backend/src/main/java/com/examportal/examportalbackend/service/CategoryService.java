package com.examportal.examportalbackend.service;

import java.util.List;

import com.examportal.examportalbackend.dao.CategoryRepo;
import com.examportal.examportalbackend.entity.exam.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    // add category
    public Category addCategory(Category category){
        return this.categoryRepo.save(category);
    }

    // update category
    public Category updateCategory(Category category){
        return this.categoryRepo.save(category);
    }

    // get all categories
    public List<Category> getAllCategories(){
      return this.categoryRepo.findAll();  
    }

    // get category by id
    public Category getCategoryById(Long categoryId){
        return this.categoryRepo.findById(categoryId).get();
    }
    
    // delete category
    public void deleteCategory(Long categoryId){
        this.categoryRepo.deleteById(categoryId);
    }

}
