package com.example.sudi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ServletComponentScan
public class SudiApplication {

    @Bean
    public RestTemplate template(){
        return new RestTemplate();
    }

	public static void main(String[] args) {
		SpringApplication.run(SudiApplication.class, args);
	}
}
