package tauchi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tauchi.entity.Page;
import tauchi.service.PageMaintenanceService;

/**
 * ページ管理Controller.
 *
 * @author tauchi
 */
@RestController
@RequestMapping("/page")
public class PageMaintenanceController {

	@Autowired
	private PageMaintenanceService service;

	/**
	 * {@link Page}を全件取得する.
	 *
	 * @return {@link Page}のList.
	 */
	@RequestMapping("/all")
	public List<Page> getAllPage() {
		return service.getAllPage();
	}

	/**
	 * IDを指定し、{@link Page}を取得する.
	 *
	 * @param param IDを含む抽出条件.
	 * @return 指定されたIDの{@link Page}.
	 */
	@RequestMapping(value="/get")
	public Page getPage(@RequestBody Page param) {
		return service.getPage(param.id);
	}

	/**
	 * ページを登録する.
	 *
	 * @param param 登録する{@link Page}.
	 * @return 更新後の{@link Page}.
	 */
	@RequestMapping(value="/register")
	public Page registerPage(@RequestBody Page param) {
		return service.registerPage(param);
	}

}
