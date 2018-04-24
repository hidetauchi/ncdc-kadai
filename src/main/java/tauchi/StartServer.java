package tauchi;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import tauchi.config.DbConfig;
import tauchi.config.DefaultAppConfig;
import tauchi.config.MvcConfig;
import tauchi.config.PropConfig;

/**
 * Spring boot実行用 Mainクラス.
 *
 * @author tauchi
 */
@EnableAutoConfiguration(exclude = {SessionAutoConfiguration.class, DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class})
@Import({ PropConfig.class, DbConfig.class, DefaultAppConfig.class, MvcConfig.class })
@Configuration
public class StartServer {

	/**
     * Spring boot実行用 Mainメソッド.
     *
     * @param args 実行時引数
     * @throws Exception 実行時例外
     */
    public static void main(String[] args) throws Exception {
        String profile = "local";
        if (args.length > 0) {
            profile = args[0].substring(args[0].indexOf("=") + 1);
        }

        System.setProperty("spring.profiles.active", profile);

        new SpringApplicationBuilder().sources(StartServer.class).run(args);
    }

}