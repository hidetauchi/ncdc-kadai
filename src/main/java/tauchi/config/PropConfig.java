package tauchi.config;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class PropConfig implements EnvironmentAware {
	private Environment environment;

	@Override
	public void setEnvironment(final Environment environment) {
		this.environment = environment;
	}

	@Bean
	public PropertySourcesPlaceholderConfigurer defaultProp() {
		String profileName = environment.getActiveProfiles()[0];
		PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
		String propName = "app-" + profileName + ".properties";
		propertyPlaceholderConfigurer.setLocation(new ClassPathResource(propName));
		return propertyPlaceholderConfigurer;
	}


}
