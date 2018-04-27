class PageView extends React.Component {
	constructor(props) {
		super(props);
		this.getPageFromServer = this.getPageFromServer.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
	}
	getPageFromServer() {
		$.ajax({
			type: 'POST',
			url: '/page/get',
			contentType: 'application/json; charset=utf-8',
			mimeType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({ id: this.props.id }),
			cache: false,
			async: false,
			success: function(data) {
				this.props.id = data.id;
				this.props.title = data.title;
				this.props.content = data.content;
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	onClickEdit() {
		ReactDOM.render(
			<PageForm id={this.props.id} />,
			document.getElementById('formDiv')
		);
	}
	render() {
		this.getPageFromServer();
		var markedContent = '';
		if (this.props.content) {
			markedContent = marked(this.props.content);
		}
		return (
			<form id="editPage" className="container-fluid">
				<div className="row px-5 py-3">
					<div className="col-md-9 col-lg-10">
						<span id="title" className="w90 fsl bold">{this.props.title}</span>
					</div>
					<div className="col-md-3 col-lg-2 pt-3">
						<a href="javascript:void(0);" onClick={this.onClickEdit} className="btn fss bold">Edit</a>
					</div>
				</div>
				<div className="row px-5 py-3 h90 scrollable">
					<div id="content" className="col-md-12 col-lg-12 h90 w95">
						{markedContent}
					</div>
				</div>
			</form>
		);
	}
};

class PageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: []};
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeContent = this.onChangeContent.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}
	getPageFromServer() {
		$.ajax({
			type: 'POST',
			url: '/page/get',
			contentType: 'application/json; charset=utf-8',
			mimeType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({ id: this.props.id }),
			cache: false,
			async: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	updatePage() {
		$.ajax({
			type: 'POST',
			url: '/page/register',
			contentType: 'application/json; charset=utf-8',
			mimeType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(this.state.data),
			cache: false,
			async: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	componentDidMount() {
		this.getPageFromServer();
	}
	onChangeTitle(e) {
		var data = {
			id: this.state.data.id,
			parentId: this.state.data.id,
			level: this.state.data.level,
			title: e.target.value,
			content: this.state.data.content
		}
		this.setState({data: data});
	}
	onChangeContent(e) {
		var data = {
			id: this.state.data.id,
			parentId: this.state.data.id,
			level: this.state.data.level,
			title: this.state.data.title,
			content: e.target.value
		}
		this.setState({data: data});
	}
	onClickSave() {
		this.updatePage();
		ReactDOM.render(
			<PageView id={this.props.id} />,
			document.getElementById('formDiv')
		);
	}
	render() {
		return (
			<form id="editPage" className="container-fluid">
				<div className="row px-5 py-3">
					<div className="col-md-9 col-lg-10">
						<input type="text" id="title" className="w90 fsl bold" value={this.state.data.title} onChange={this.onChangeTitle} />
					</div>
					<div className="col-md-3 col-lg-2 pt-3">
						<a href="javascript:void(0);" onClick={this.onClickSave} className="btn fss bold">Save</a>
					</div>
				</div>
				<div className="row px-5 py-3 h90 scrollable">
					<div className="col-md-12 col-lg-12">
						<textarea id="content" className="h90 w95 scrollable" value={this.state.data.content} onChange={this.onChangeContent} />
					</div>
				</div>
			</form>
		);
	}
};

