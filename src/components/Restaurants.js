import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Box, Grid, Image, Heading, Paragraph, ResponsiveContext } from 'grommet';

import * as queries from '../graphql/queries';

const GatsbyLink = styled(Link)`
  color: #00739d;
  text-decoration: none;
`;

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch the data once the component is loaded
  useEffect(() => {
    async function fetchRestaurantsAPI() {
      try {
        const rdata = await API.graphql(graphqlOperation(queries.listRestaurants));
        const {
          data: {
            listRestaurants: { items }
          }
        } = rdata;
        console.log('items: ', items);
        setRestaurants(items);
      } catch (err) {
        console.log('error: ', err);
      }
    }

    fetchRestaurantsAPI();
  }, []);

  // Display the message if no restaurants are available
  let output = (
    <Box flex align="center" justify="center">
      Создайте ваш первый ресторан, нажав +
    </Box>
  );

  if (restaurants.length !== Number(0)) {
    output = restaurants.map((r, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box gap="medium" key={i}>
        <Box height="small" border>
          <Image src={r.photo} fit="cover" />
        </Box>

        <div>
          <GatsbyLink to={`/restaurant/${r.id}`} state={{ restaurant: r }}>
            <Heading
              level={3}
              margin="none"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {r.name}
            </Heading>
          </GatsbyLink>
          <Paragraph>{r.city}</Paragraph>
        </div>
      </Box>
    ));
  }

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Grid
          columns={{
            count: size === 'small' ? 2 : 3,
            size: 'auto'
          }}
          gap="small"
          style={{ maxWidth: '1280px', margin: '25px auto' }}
        >
          {output}
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Restaurants;
