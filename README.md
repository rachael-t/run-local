# Run Local

## Abstract

 This [project](https://frontend.turing.io/projects/module-3/binary-challenge.html) was a solo project during the third quarter at [Turing School of Software & Design](https://turing.io/) in which I was tasked with building a React app for a specific audience that ultiized an external API. 

Run Local is a website for runners located in northwest Denver suburbs who are interested in finding new trails to run in their area. Runners can pick a city, see the weather for that selected city, and then get a list of local running trails nearby. They can review the trail details and save the trail if they'd like. Then, they can review all saved trails from any city to make a decision on which trail they'd like to run that day.

Currently, the cities featured in Run Local are: Arvada, Broomfield, Lafayette, Louisville, Superior, and Westminster.

The application can be found [here](https://run-local.netlify.app/).


## Technologies Used

* React
* React Router
* React Testing Library
* Jest
* JavaScript
* [OpenWeather](https://openweathermap.org/) API
* [Trail Run Project](https://www.trailrunproject.com/) API


## Project Images / Gifs

Landing page:
![2020-06-09 09 38 48](https://user-images.githubusercontent.com/54180641/84168823-1a552e00-aa35-11ea-99be-49e028b0bee3.gif)


Viewing a selected trail's detail page:
<img width="1432" alt="Screen Shot 2020-06-09 at 9 42 25 AM" src="https://user-images.githubusercontent.com/54180641/84169189-8e8fd180-aa35-11ea-814f-7958c86dd6b4.png">


Switching cities:
![2020-06-09 09 43 45](https://user-images.githubusercontent.com/54180641/84169359-c5fe7e00-aa35-11ea-92b2-f1233077cb55.gif)


Viewing saved trails:
<img width="1432" alt="Screen Shot 2020-06-09 at 9 45 12 AM" src="https://user-images.githubusercontent.com/54180641/84169589-01994800-aa36-11ea-884d-b34d9ed5e034.png">


Removing from saved:
![2020-06-09 09 46 56](https://user-images.githubusercontent.com/54180641/84169727-31e0e680-aa36-11ea-8d97-4c65f808fa44.gif)


Page displayed when a user has navigated to an incorrect URL:
<img width="1438" alt="Screen Shot 2020-06-09 at 9 47 49 AM" src="https://user-images.githubusercontent.com/54180641/84169800-4cb35b00-aa36-11ea-8de8-6a384226b010.png">


## Planning
Please see this [Gist](https://gist.github.com/rachael-t/686a4291f85fb5fb713bff03abd3a407) for the initial brainstorm and planning of this project.


## Setup

1. Fork this repository.

2. Clone your forked repository.

3. Change into the directory and install the project dependencies by running `npm install`

4. Check that it is setup correctly by entering `npm test` in your terminal. All tests should be passing.

5. In your terminal, run `npm start` and then navigate to `http://localhost:3000/` in your browser.


## Learning Goals

* Use the technologies I've learned over the course of the quarter to demonstrate mastery in React, Router, and asynchronous JavaScript.

* Work within constraints to deliver a unique product for my audience which helps them in some way. 


## Future Iterations

* Ulitize Google Maps API to provide a map of the trail's location.

* Provide a more detailed daily forecast (versus the current weather conditions).

* Provide suggestions on running attire based on the current weather.

* Expand upon cities in the surrounding northwest Denver area for a user to search trails nearby. 

* Allow users to select from a variety of distances from their selected city (it is currently limited to 5 miles).


## Contributor

* [Rachael Thomas](https://github.com/rachael-t)



_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._
