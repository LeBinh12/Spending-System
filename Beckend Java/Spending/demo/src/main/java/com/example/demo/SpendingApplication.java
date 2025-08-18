package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class SpendingApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpendingApplication.class, args);
	}

}


//@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
//@RestController
//@RequestMapping( path = "/categories")
//public class DishCategoriesController {
//    private final CategoryResponsitory data;
//    private final DishResponsitory dish;
//    private final DishCategoryJpa jpa;
//    @Autowired
//    public DishCategoriesController(CategoryResponsitory categoryResponsitory,
//                                    DishResponsitory dishResponsitory,
//                                    DishCategoryJpa dishCategoryJpa){
//        data = categoryResponsitory;
//        dish = dishResponsitory;
//        jpa = dishCategoryJpa;
//    }
//
//    @GetMapping("/getAll")
//    public @ResponseBody Iterable<DishCategory> getAddCategories(){
//        return data.findAll();
//    }