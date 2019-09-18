import React, { useContext } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { Box, Button, Heading, Grommet, Collapsible } from 'grommet';
import { Add } from 'grommet-icons';
import { grommet } from 'grommet/themes';

import NavContext from '../context/NavContext';
import CreateRestaurant from '../components/CreateRestaurant';
import Toastr from '../components/Toastr';

const Link = styled(GatsbyLink)`
  text-decoration: none;
`;

const Layout = ({ children, setRestaurants }) => {
  const { createRestaurantIsOpen, toggleNavState } = useContext(NavContext);

  const onClose = () => {
    toggleNavState('createRestaurantIsOpen');
  };

  return (
    <Grommet full theme={grommet}>
      <Box
        as="header"
        direction="row"
        align="center"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="between"
        background="neutral-3"
        elevation="large"
        style={{ zIndex: '1000' }}
      >
        <Link to="/">
          <Heading level={3} margin="none" color="white">
            <strong>Обзор ресторанов</strong>
          </Heading>
        </Link>
        <Button onClick={onClose} icon={<Add color="white" />} />
      </Box>
      <Box pad="medium" flex direction="row">
        {children}
        <Collapsible direction="horizontal" open={createRestaurantIsOpen}>
          <CreateRestaurant setRestaurants={setRestaurants} />
        </Collapsible>
      </Box>
      <Toastr />
    </Grommet>
  );
};

export default Layout;
