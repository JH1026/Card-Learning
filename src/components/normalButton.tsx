import React from 'react';
import { Button } from '@material-ui/core';

type ClickFunc = () => void;

interface NormalButtonProps {
  title: string;
  addStyle?: any;
  isColored?: boolean;
  isHidden?: boolean;
  onClick: ClickFunc;
}

class NormalButton extends React.PureComponent<NormalButtonProps, {}> {
  render() {
    const {
      title,
      addStyle,
      isColored,
      isHidden,
      onClick,
    } = this.props;

    if (isHidden) {
      return null;
    }

    const buttonStyle = {
      ...addStyle,
      textTransform: 'none',
      color: isColored ? '#09f' : '#fff',
    };

    return (
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => onClick()}
      >
        {title}
      </Button>
    );
  }
}

export default NormalButton;
