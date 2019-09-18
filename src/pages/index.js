import React from 'react';

import Layout from '../layouts/layout';
import SEO from '../components/seo';
import Restaurants from '../components/Restaurants';

const HomePage = () => (
  <Layout>
    <SEO title="Главная страница" />
    <Restaurants />
  </Layout>
);

export default HomePage;
