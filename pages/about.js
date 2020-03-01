import React from "react";
import Head from "next/head";

import Header from "../components/header";

class About extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>About FootyBee</title>
        </Head>
        <Header about={true} />
        <div className="content-page">
          <h1>About FootyBee</h1>
          <div className="about">
            <div className="about-content">
              <p>
                FootyBee is a Euro 2020 football predictor. As a FootyBee user,
                you can make predictions on every Euro 2020 game, create and
                join leagues with your friends and even customise how your
                league scores points. You can score points by making correct
                predictions, correctly predicting which teams qualify from the
                group stages and making correct predictions on individual awards
                like who wins the Golden Boot.
              </p>
              <p>
                FootyBee is built using React as a frontend, a combination of
                NextJS and ExpressJS for the backend and Sequelize as an ORM
                between the API and the database. The FootyBee app is built
                using a combination of mostly React Native and Mobx.
              </p>

              <h2>How it came about.</h2>
              <p>
                The idea of creating a football predictor for the Euros started
                4 years ago by my brother, James. He created a mini league
                between around 10 of his mates and myself and each of us
                predicted a score for each game and he used excel to track all
                the scores and point. Each player got points for correct
                predictions and we each shot a tenner in to make things more
                interesting. It was good fun and made even games like Wales vs
                Slovakia more of a thrilling game than it should have been.
              </p>
              <p>
                2 years later, we did the same for the World Cup. Since I was a
                newly graduated computer science student I decided to try making
                a website to manage the entire process. As I later learned was a
                common thing when developing anything, I sorely misjudged how
                long it would take and the website was half finished, look very
                basic and was overall a bit shit.
              </p>
              <p>
                2 more years later and I have a much better grasp of developing
                website and even apps now. As someone who likes a challenge, I
                decided to expand the original idea which culminated 4 years
                ago, and create a system where multiple leagues can be hosted on
                a single site with more flexibility in how points in leagues are
                distributed. Which bring us to this website which is built
                entirely from scratch and hopefully much better than my last
                one.
              </p>
            </div>
            <div className="about-image">
              <img src="/static/about.jpg" alt="Me and James" />
              <p>Me(right) and James(left) at James' wedding</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
