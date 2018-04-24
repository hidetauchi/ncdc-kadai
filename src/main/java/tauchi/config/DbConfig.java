package tauchi.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * DB接続設定.
 *
 * @author tauchi
 */
@EnableTransactionManagement
@Configuration
public class DbConfig {

	@Value("${db.url}")
	private String url;
	@Value("${db.driver}")
	private String driver;
	@Value("${db.user}")
	private String user;
	@Value("${db.password}")
	private String password;
	@Value(value = "${mybatis.config.path:mybatis/config.xml}")
	private String mybaticConfigPath;


	private DataSource dataSource() {
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName(driver);
		ds.setUrl(url);
		ds.setUsername(user);
		ds.setPassword(password);
		return ds;
	}

	private SqlSessionFactory sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());
		sqlSessionFactory.setConfigLocation(new ClassPathResource(mybaticConfigPath));
		return (SqlSessionFactory) sqlSessionFactory.getObject();
	}

	/**
	 * {@link SqlSession}の設定.
	 *
	 * @return {@link SqlSession}
	 * @throws Exception
	 */
	@Bean(destroyMethod = "clearCache")
	public SqlSession sqlSession() throws Exception {
		return new SqlSessionTemplate(sqlSessionFactory());
	}

	/**
	 * {@link PlatformTransactionManager}の設定.
	 *
	 * @return {@link PlatformTransactionManager}
	 */
	@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

}
