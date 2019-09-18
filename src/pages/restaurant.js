import React, { useEffect, useState } from 'react';
import { Box, Heading, Grid, Image, Paragraph } from 'grommet';
import Rating from 'react-rating';
import { API, graphqlOperation } from 'aws-amplify';

import { Star } from 'grommet-icons';
import * as queries from '../graphql/queries';
import Layout from '../layouts/layout';
import SEO from '../components/seo';
import CreateReviewForm from '../components/CreateReviewForm';

const RestaurantPage = ({ location }) => {
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);

  // Fetch the data once the component is loaded
  useEffect(() => {
    async function fetchRestaurantAPI(r) {
      try {
        const rdata = await API.graphql(graphqlOperation(queries.getRestaurant, { id: r.id }));
        const {
          data: { getRestaurant }
        } = rdata;
        setRestaurant(getRestaurant);
        setReviews(getRestaurant.reviews.items);
      } catch (err) {
        console.log('error: ', err);
      }
    }

    if (location.state.restaurant) {
      fetchRestaurantAPI(location.state.restaurant);
    }
  }, []);

  const reviewsList = reviews.map((r, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Box key={i} background="light-2" pad="medium" round="small">
      <Rating
        fullSymbol={<Star color="#ffc95e" />}
        emptySymbol={<Star color="#cccccc" />}
        initialRating={r.rating}
        readonly
      />
      <Paragraph fill>{r.text}</Paragraph>
    </Box>
  ));

  return (
    <Layout>
      <SEO title="Страница ресторана" />
      <Box style={{ maxWidth: '1280px', margin: '25px auto' }}>
        {restaurant.name && (
          <>
            <Heading level={1} margin="none">
              {restaurant.name}
            </Heading>
            <Paragraph>{restaurant.city}</Paragraph>
            <Box height="medium" border>
              <Image src={restaurant.photo} fit="cover" />
            </Box>
          </>
        )}

        {reviewsList.length !== Number(0) && (
          <Grid gap="small">
            <Heading level={2}>Отзывы ({reviewsList.length}):</Heading>
            {reviewsList}
          </Grid>
        )}

        {restaurant.id && <CreateReviewForm setReviews={setReviews} id={restaurant.id} />}
      </Box>
    </Layout>
  );
};

export default RestaurantPage;
