import React, { useContext } from 'react';
import { Layer, Box, Button, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';
import NavContext from '../context/NavContext';

const Toastr = () => {
  const { toastrIsOpen, toggleNavState } = useContext(NavContext);

  const closeHandler = () => {
    toggleNavState('toastrIsOpen', 'close');
  };

  return (
    toastrIsOpen && (
      <Layer
        position="bottom"
        modal={false}
        margin={{ vertical: 'medium', horizontal: 'small' }}
        onEsc={closeHandler}
        responsive={false}
        plain
      >
        <Box
          align="center"
          direction="row"
          gap="small"
          justify="between"
          round="medium"
          elevation="medium"
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
          background="status-ok"
        >
          <Box align="center" direction="row" gap="xsmall">
            <StatusGood />
            <Text>Новый ресторан был успешно добавлен</Text>
          </Box>
          <Button icon={<FormClose />} onClick={closeHandler} plain />
        </Box>
      </Layer>
    )
  );
};

export default Toastr;
