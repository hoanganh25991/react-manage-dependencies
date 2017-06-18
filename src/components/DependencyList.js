import React, {PureComponent} from 'react'

export default class DependencyList extends PureComponent {
	render(){
		let {dependencies} = this.props;

		return (
			<div>
				{dependencies && dependencies.length > 0 ?
					dependencies.map(dependency => (
						<div>Package X</div>
					)) : 'no package found'
				}
			</div>
		)
	}
}




