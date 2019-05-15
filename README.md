React-portal
============
[![npm version](https://img.shields.io/npm/v/react-portal.svg?style=flat-square)](https://www.npmjs.com/package/react-portal-advanced)

> Managing state for Modals and popups can be really struggling and hard to maintain. Here is a simple Component for you which will ease your struggles!

*Looking for demos? Go [here](https://ayesha582.github.io/react-portal-advanced-demos/).*

## Features

- **uses React v16 and its official API for creating portals**
- transports its children into a new React Portal which is appended by default to **document.body**
- can target user specified DOM element
- offers component control both from parent component state and child component hooks.
- provides **close on ESC** and **close on outside mouse click**.

## Installation

```shell
yarn add react-portal-advanced
```
OR

```shell
npm install react-portal-advanced
```

## Usage

### Portal

```jsx 
import React from "react";
import Modal from "react-portal-advanced";
const node = document.getElementById("root");

class ModalParent extends React.Component {

  render() {
    return (
      <div>
        <Modal
          node={node}
          size={"medium"}
          trigger={<button type="button">Open Modal</button>}
          closeable
        >
          This is a Modal.
        </Modal>
      </div>
    );
  }
}

export default ModalParent;

```
**Modal Component accepts both text and dom nodes as children**

### Props:

- **node**-accepts a document node to which the portal will be mounted
- **trigger**-accepts a document node on click of which the Portal Modal will be opened
- **size**-accepts one of the three values -> tiny,medium,large
- **defaultOpen**-Opens the Portal Modal by Default on Component Mount
- **onOpen**-accepts a callback function to be called after the Portal Modal is opened
- **onClose**-accepts a callback function to be called after the Portal Modal is closed
- **closeOnEsc**-Closes the modal on Esc Press
- **closeOnOuterClick**-Closes the modal on user click outside the Modal content
- **closeAfter**-accepts number value in ms. If exists closes the Modal after the specified duration


*Full documentation - [here](https://ayesha582.github.io/react-portal-advanced-demos/).*

## Run Examples

```shell
git clone https://github.com/ayesha582/react-portal-advanced-demos.git
cd react-portal-advanced-demos
yarn install
yarn storybook
```

## Author

Ayesha Mundu 2019
