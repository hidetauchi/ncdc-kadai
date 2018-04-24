package tauchi.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tauchi.entity.Page;

@Repository
public class PageDao {

    /** org.apache.ibatis.session.SqlSession */
    @Autowired
    private SqlSession session;


	/**
	 * {@link Page}を全件取得する.
	 *
	 * @return {@link Page}のList.
	 */
	public List<Page> selectAll() {
		return session.selectList("mybatis.PageDao.selectAll");
	}

	/**
	 * IDを指定し、{@link Page}を取得する.
	 *
	 * @param id (抽出条件)ID.
	 * @return 指定されたIDの{@link Page}.
	 */
	public Page selectByPrimaryKey(Long id){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		return session.selectOne("mybatis.PageDao.selectByPrimaryKey", map);
	}

	/**
	 * {@link Page}を登録する.
	 *
	 * @param entity 登録する{@link Page}.
	 * @return 登録した{@link Page}のID.
	 */
	public Long insert(Page entity){
		session.insert("mybatis.PageDao.insert", entity);
		return entity.id;
	}

	/**
	 * {@link Page}を更新する.
	 *
	 * @param entity 更新する{@link Page}.
	 */
	public void update(Page entity){
		session.insert("mybatis.PageDao.update", entity);
	}

}
