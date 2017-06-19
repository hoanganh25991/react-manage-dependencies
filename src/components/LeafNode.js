import React from "react"

export default class LeafNode extends React.Component {
  constructor(props) {
    super(props)
  }

  load() {
    let { data } = this.props
    let isArray = Array.isArray(data)
  }

  render() {
    return <div />
  }
}
