package fr.df.muscu.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class Application {
	// TODO Auto-generated constructor stub

	public static void main (String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
