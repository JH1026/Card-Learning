import React from 'react';
import {
  Radio,
  withStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const styles = {
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
};

type PageProps = {
  classes: any,
};

type PageState = {

};

class BuleRadio extends React.PureComponent<PageProps, PageState> {
  render() {
    return (
      <Radio color="default" {...this.props} />
    );
  }
}

export default withStyles(styles)(BuleRadio);
