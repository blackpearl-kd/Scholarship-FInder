import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedScholarships from '../components/Home/FeaturedScholarships';
import HowItWorks from '../components/Home/HowItWorks';
import CallToAction from '../components/Home/CallToAction';
import Testimonials from '../components/Home/Testimonials';
import Layout from '../components/Layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedScholarships />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Home;