import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./style.css";

const Trigger = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.openPortal = this.openPortal.bind(this);
    this.closePortal = this.closePortal.bind(this);
  }

  openPortal() {
    const { node, onOpen } = this.props;
    node.appendChild(this.el);
    onOpen && onOpen();
    const {closeAfter} =  this.props;
    if(closeAfter){
      setTimeout(this.closePortal,closeAfter);
    }
  }

  closePortal() {
    const { node, onClose } = this.props;
    if(node.contains(this.el)){
      node.removeChild(this.el);
      onClose && onClose();
    }
  }

  componentWillUnmount() {
    const { node } = this.props;
    node.removeChild(this.el);
  }

  render() {
    const { trigger, closable, size="" } = this.props;
    return (
      <Fragment>
        {trigger && <Trigger onClick={this.openPortal}>{trigger}</Trigger>}
        {ReactDOM.createPortal(
          <div className={"portal-wrapper " + size}>
            <div className="content">
            {closable && <button className="close-btn" onClick={this.closePortal}>x</button>}
            {this.props.children}
            </div>
          </div>,
          this.el
        )}
      </Fragment>
    );
  }
}

export default Modal;
