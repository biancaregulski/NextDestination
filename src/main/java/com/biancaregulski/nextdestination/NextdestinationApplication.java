/* mvnw spring-boot:run
 * mvnw spring-boot:run -Dspring-boot.run.profiles=dev
 * yarn start
 * yarn run start */

package com.biancaregulski.nextdestination;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NextdestinationApplication {

	public static void main(String[] args) {
		SpringApplication.run(NextdestinationApplication.class, args);
	}
}