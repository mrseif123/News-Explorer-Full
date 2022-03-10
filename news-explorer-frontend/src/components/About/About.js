import React from 'react';
import aboutImage from '../../images/seaf.jfif';

function About() {
  return (
    <section className='about'>
      <div className='about__container'>
        <img
          className='about__image'
          src={aboutImage}
          alt='Author of the website'
        />
        <div className='about__text-container'>
          <h2 className='about__title'>About the author</h2>
          <p className='about__text'>
            Hi, my name is Seaf Aliyan, a Computer Science student @ The Hebrew University of Jerusalem
          </p>
          <p className='about__text'>
            This is my final project in the Full Stack Developer
            Bootcamp at Practicum by Yandex, started in February 2021. During my
            learning journey I helped other students with questions related to
            course/sprints assignments and projects. The project's Frontend uses
            React and the Backend/API uses Node.js, Express.js, MongoDB,
            Mongoose, AWS. Basically, this app allows users to search
            news/articles using a public News API service.
          </p>
          <p className='about__text'>
            Bootcamp at Practicum by Yandex, started in July 2021. 
            The project's Frontend uses React and the Backend/API uses
            Node.js, Express.js, MongoDB, Mongoose, AWS. Basically,
            this app allows users to search news/articles using a public News API service.
            AWS.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
