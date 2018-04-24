package tauchi.entity;

import java.io.Serializable;

/**
 * ページ要素.
 *
 * @author tauchi
 */
public class Page  implements Serializable {

	private static final long serialVersionUID = -735350368245872637L;

	/** ID. */
	public Long id;
	/** 親要素ID. */
	public Long parentId;
	/** 階層. */
	public Integer level;
	/** タイトル. */
	public String title;
	/** 内容. */
	public String content;

}
