import React from 'react'
import Hero from './components/Hero'
import HeroBlogs from './components/LatestBlogs'
import AboutSection from './components/About'
import Label from './components/label'
import Feedback from './components/Feedback'
import Faq from './components/faq'

const Home = () => {
  return (
    <div>
      <Hero/>
      <AboutSection/>
      <HeroBlogs/>
      <Label/>
      <Feedback/>
      <Faq/>
    </div>
  )
}

export default Home
