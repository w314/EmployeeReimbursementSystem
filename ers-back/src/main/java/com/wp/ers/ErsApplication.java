package com.wp.ers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EntityScan("com.wp.ers.models") // tells Spring to look for DB entities in that package
@ComponentScan("com.wp.ers") // tells Spring to look for beans
@EnableJpaRepositories("com.wp.repositories") // tells Spring to look for repositories in that package
@SpringBootApplication
public class ErsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErsApplication.class, args);
	}

}
