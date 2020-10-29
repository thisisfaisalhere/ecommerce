import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { addCollections } from "../../firebase/firebase.utils";

import "./admin.styles.scss";

class AdminPage extends React.Component {
  componentDidMount() {
    const { collectionsArray } = this.props;

    addCollections(
      "collections",
      collectionsArray.map(({ title, items }) => ({ title, items }))
    );
  }

  render() {
    return (
      <div>
        <p>This is admin page</p>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collectionsArray: selectCollectionsForPreview,
});

export default connect(mapStateToProps, null)(AdminPage);
