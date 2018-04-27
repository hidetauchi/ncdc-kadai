class TreeNode extends React.Component {
	constructor(props) {
		super(props);
		this.onClickTitle = this.onClickTitle.bind(this);
		this.onClickAddBrother = this.onClickAddBrother.bind(this);
		this.onClickAddChild = this.onClickAddChild.bind(this);
	}
	createNode(parentId, level, title) {
		var param = {
			parentId: parentId,
			level: level,
			title: title
		};
		$.ajax({
			type: 'POST',
			url: '/page/register',
			contentType: 'application/json; charset=utf-8',
			mimeType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(param),
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
	onClickTitle() {
		ReactDOM.render(
			<PageView id={this.props.id} />,
			document.getElementById('formDiv')
		);
	}
	onClickAddBrother() {
		this.createNode(this.props.parentId, this.props.level, 'Title');
		ReactDOM.render(
			<TreeView pollInterval={300000} />,
			document.getElementById('treeDiv')
		);
	}
	onClickAddChild() {
		this.createNode(this.props.id, this.props.level + 1, 'Title');
		ReactDOM.render(
			<TreeView pollInterval={300000} />,
			document.getElementById('treeDiv')
		);
	}
	render() {
		var level = this.props.level;
		if (level == 3) {
			return (
				<div className="row my-2">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" onClick={this.onClickTitle} className="ml-50 fss">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
					</div>
				</div>
			);
		} else if (level == 2) {
			return (
				<div className="row my-2">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" onClick={this.onClickTitle} className="ml-30 fss">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
						<a href="javascript:void(0);" className="btn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus m-1"></i></a>
						<div className="dropdown-menu dropdown-menu-right">
							<a href="javascript:void(0);" onClick={this.onClickAddBrother} className="dropdown-item">Add 2nd Menu</a>
							<div className="dropdown-divider"></div>
							<a href="javascript:void(0);" onClick={this.onClickAddChild} className="dropdown-item">Add 3rd Menu</a>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="row my-3">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" onClick={this.onClickTitle} className="ml-10 fsm bold">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
						<a href="javascript:void(0);" className="btn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus m-1"></i></a>
						<div className="dropdown-menu dropdown-menu-right">
							<a href="javascript:void(0);" onClick={this.onClickAddBrother} className="dropdown-item">Add Main Menu</a>
							<div className="dropdown-divider"></div>
							<a href="javascript:void(0);" onClick={this.onClickAddChild} className="dropdown-item">Add 2nd Menu</a>
						</div>
					</div>
				</div>
			);
		}
	}
}


class TreeView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: []};
		this.getAllNodesFromServer();
		setInterval(this.getAllNodesFromServer, this.props.pollInterval);
		ReactDOM.render(
			<PageView id={1} />,
			document.getElementById('formDiv')
		);
	}
	getAllNodesFromServer() {
		$.ajax({
			url: '/page/all',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	render() {
		var allNodes = this.state.data.map(function(node) {
			return (
	          <TreeNode id={node.id} parentId={node.parentId} level={node.level} title={node.title} />
			);
		});
		return (
			<div>
			{allNodes}
			</div>
		);
	}
};

ReactDOM.render(
	<TreeView pollInterval={300000} />,
	document.getElementById('treeDiv')
);
