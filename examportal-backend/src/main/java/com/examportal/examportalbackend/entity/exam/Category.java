package com.examportal.examportalbackend.entity.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name="category")
@CrossOrigin("*")
public class Category {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)    
    private Long cid;

    private String title;

    private String description;

    @OneToMany(mappedBy="category",fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Quiz> quizzer = new LinkedHashSet<>();

    public Category() {
    }

    public Category(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Long getCid() {
        return this.cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Set<Quiz> getQuizzer() {
        return this.quizzer;
    }

    public void setQuizzer(Set<Quiz> quizzer) {
        this.quizzer = quizzer;
    }


    
}
