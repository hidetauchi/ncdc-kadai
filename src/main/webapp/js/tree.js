class TreeNode extends React.Component {
	render() {
		var level = this.props.level;
		if (level == 3) {
			return (
				<div className="row my-2">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" className="ml-50 fss">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
					</div>
				</div>
			);
		} else if (level == 2) {
			return (
				<div className="row my-2">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" className="ml-30 fss">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
						<a href="javascript:void(0);" className="btn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus m-1"></i></a>
						<div className="dropdown-menu dropdown-menu-right">
							<a className="dropdown-item" href="javascript:void(0);">Add 2nd Menu</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="javascript:void(0);">Add 3rd Menu</a>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="row my-3">
					<div className="col-md-8 col-lg-9 pl-0">
						<a href="javascript:void(0);" className="ml-10 fsm bold">{this.props.title}</a>
					</div>
					<div className="col-md-4 col-lg-3 tac">
						<a href="javascript:void(0);" className="btn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus m-1"></i></a>
						<div className="dropdown-menu dropdown-menu-right">
							<a className="dropdown-item" href="javascript:void(0);">Add Main Menu</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="javascript:void(0);">Add 2nd Menu</a>
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
	          <TreeNode level={node.level} title={node.title} key={node.id} />
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
ReactDOM.render(
	<PageView id={1} />,
	document.getElementById('formDiv')
);
