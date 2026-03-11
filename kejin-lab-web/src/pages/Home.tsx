import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Thoughts from '../components/Thoughts';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Thoughts />
      <Contact />
    </>
  );
};

export default Home;