package tauchi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tauchi.dao.PageDao;
import tauchi.entity.Page;

/**
 * ページ管理Service.
 *
 * @author tauchi
 */
@Service
@Transactional
public class PageMaintenanceService {

	@Autowired
	private PageDao pageDao;

	/**
	 * {@link Page}を全件取得する.
	 *
	 * @return {@link Page}のList.
	 */
	public List<Page> getAllPage() {
		return pageDao.selectAll();
	}

	/**
	 * IDを指定し、{@link Page}を取得する.
	 *
	 * @param pageId ID.
	 * @return 指定されたIDの{@link Page}.
	 */
	public Page getPage(Long pageId) {
		return pageDao.selectByPrimaryKey(pageId);
	}

	/**
	 * ページを登録する.
	 *
	 * @param paramPage 登録する{@link Page}.
	 * @return 更新後の{@link Page}.
	 */
	public Page registerPage(Page paramPage) {
		Long pageId = paramPage.id;
		if (pageId == null) {
			pageId = pageDao.insert(paramPage);
		} else {
			pageDao.update(paramPage);
		}
		return this.getPage(pageId);
	}

}
