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
    this.closeKeyPress = this.closeKeyPress.bind(this);
    this.closeOnClick = this.closeOnClick.bind(this);
  }

  componentDidMount(){
    const {defaultOpen} = this.props;
    if(defaultOpen){
      this.openPortal();
    }
  }

  openPortal() {
    const { node, onOpen, closeOnEsc, closeAfter } = this.props;
    if (node.contains(this.el)) return;
    node.appendChild(this.el);
    onOpen && onOpen();
    if (closeOnEsc) {
      console.log("Inside evnt handler");
      document.addEventListener("keydown", this.closeKeyPress);
    }
    if (closeAfter) {
      setTimeout(this.closePortal, closeAfter);
    }
  }

  closeKeyPress(e) {
    console.log("Inside evnt handler", e);
    if (e.key === "Escape") {
      this.closePortal();
    }
  }

  closeOnClick(e) {
    const { closeOnOuterClick } = this.props;
    e.stopPropagation();
    closeOnOuterClick && this.closePortal();
  }

  closePortal() {
    const { node, onClose } = this.props;
    if (node.contains(this.el)) {
      node.removeChild(this.el);
      onClose && onClose();
    }
  }

  componentWillUnmount() {
    const { node } = this.props;
    node.removeChild(this.el);
  }

  render() {
    const { trigger, closable, size = "" } = this.props;
    const children = React.Children.map(this.props.children, (child, index) => {
      if(typeof child === "string"){
        return child;
      }
      return React.cloneElement(child, {
        ...this.props,
        close: this.closePortal,
        open: this.openPortal
      });
    });
    return (
      <Fragment>
        {trigger && <Trigger onClick={this.openPortal}>{trigger}</Trigger>}
        {ReactDOM.createPortal(
          <div className={"portal-wrapper " + size} onClick={this.closeOnClick}>
            <div className="content">
              {closable && (
                <button className="close-btn" onClick={this.closePortal}>
                  x
                </button>
              )}
              {children}
            </div>
          </div>,
          this.el
        )}
      </Fragment>
    );
  }
}

export default Modal;
