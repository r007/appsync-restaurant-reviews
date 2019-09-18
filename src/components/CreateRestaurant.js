import React, { useContext, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Box, Button, Heading, FormField, TextInput, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import * as mutations from '../graphql/mutations';
import NavContext from '../context/NavContext';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState('');

  // Is sidebar open? Control the nav state
  const { createRestaurantIsOpen, toggleNavState } = useContext(NavContext);

  const createRestaurantHandler = async restaurant => {
    try {
      await API.graphql(graphqlOperation(mutations.createRestaurant, { input: restaurant }));
    } catch (err) {
      console.log('error creating restaurant: ', err);
    }
  };

  const toggleNav = () => {
    toggleNavState('createRestaurantIsOpen');
  };

  /**
   * Clear all the fields
   */
  const resetForm = () => {
    setName('');
    setCity('');
    setPhoto('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    try {
      createRestaurantHandler({ name, city, photo });
      resetForm();
      toggleNav();
      toggleNavState('toastrIsOpen', 'open');
    } catch (err) {
      console.log('error submitting form: ', err);
    }
  };

  return (
    createRestaurantIsOpen && (
      <Layer position="right" full="vertical" modal onClickOutside={toggleNav} onEsc={toggleNav}>
        <Box
          as="form"
          fill="vertical"
          overflow="auto"
          width="medium"
          pad="medium"
          onSubmit={handleSubmit}
        >
          <Box flex={false} direction="row" justify="between">
            <Heading level={3} margin="none">
              Добавить ресторан
            </Heading>
            <Button icon={<Close />} onClick={toggleNav} />
          </Box>
          <Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
            <FormField label="Название кафе/ресторана">
              <TextInput
                name="name"
                onChange={value => setName(value.target.value)}
                value={name}
                required
              />
            </FormField>
            <FormField label="Город">
              <TextInput
                name="city"
                onChange={value => setCity(value.target.value)}
                value={city}
                required
              />
            </FormField>
            <FormField label="Фотография">
              <TextInput
                name="photo"
                onChange={value => setPhoto(value.target.value)}
                value={photo}
                required
              />
            </FormField>
          </Box>
          <Box flex={false} as="footer" align="start">
            <Button type="submit" label="Отправить" primary />
          </Box>
        </Box>
      </Layer>
    )
  );
};

export default CreateRestaurant;
