import React, { useState } from 'react';
import { Box, Button, FormField, Heading, TextArea } from 'grommet';
import Rating from 'react-rating';
import { Edit, Star } from 'grommet-icons';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

const CreateReviewForm = ({ setReviews, id }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const createReview = async input => {
    try {
      console.log(input);
      await API.graphql(graphqlOperation(mutations.createReview, { input }));
    } catch (err) {
      console.log('error creating review: ', err);
    }
  };

  /**
   * Clear all the fields
   */
  const resetForm = () => {
    setText('');
    setRating(0);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (text === '' || rating === Number(0)) return;

    try {
      const input = { reviewRestaurantId: id, text, rating };
      createReview(input);
      // Update the UI
      setReviews(oldReviews => [...oldReviews, input]);
      resetForm();
    } catch (err) {
      console.log('error submitting form: ', err);
    }
  };

  return (
    <Box pad={{ vertical: 'medium' }} as="form" onSubmit={handleSubmit}>
      <Heading level={3}>Добавить отзыв</Heading>
      <Box>
        <Rating
          id="rating"
          fullSymbol={<Star color="#ffc95e" />}
          emptySymbol={<Star color="#cccccc" />}
          onChange={value => setRating(value)}
          initialRating={rating}
        />
        <FormField label="Текст отзыва">
          <TextArea
            name="text"
            onChange={value => setText(value.target.value)}
            value={text}
            required
          />
        </FormField>
      </Box>
      <Box flex={false} as="footer">
        <Button primary type="submit" icon={<Edit />} label="Отправить отзыв" />
      </Box>
    </Box>
  );
};

export default CreateReviewForm;
