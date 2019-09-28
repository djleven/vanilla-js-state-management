# Reactive Data Driven Test Quiz in Vanilla js

A data driven vanilla js implementation of reactive components and state management (similar to React / Redux, Vue / Vuex)

###Quiz Requirements

- Implementation to be in vanilla javascript with no frameworks used

- Upon the page load, display the first question title, image and possible answers

- When user is done answering he should be able to choose to continue with the next question

- Upon submission, the answer validation should be displayed for 3 seconds before moving on.

- If the answer was wrong, the correct answer should be highlighted

- Get the questions and final results data from AJAX requests 
 
***

###Added goodies

- Images to be displayed are done so as a (full-page) background

- Prefetch the question and final result images for a smoother user experience between transitions

- Upon showing the correct answer, a relevant randomised comment is also displayed from a pool (ex: 'Good Job!' or 'Nope, that's not it').

- Some basic test examples using the Jest library
 
## Implementation base

The vanilla js reactive component and state management model has been based on (forked from) 

##### [Vanilla JavaScript state management](https://github.com/hankchizljaw/vanilla-js-state-management) by [hankchizljaw](https://github.com/hankchizljaw) 

This entire 'model' consists of three simple, 'short and sweet' classes / files which are found in the `lib` directory:

If we remove the comments and function signatures, this 'model' is 83 lines.

- `Component` class in `component.js` (13 lines)
- `Store class` in `store.js` (52 lines)
- `PubSub` class in `pubsub.js` (18 lines)

The logic behind it is:

1- The `PubSub` adds the functionality that:
- allows our Component class to subscribe (sub) to named events, 
- allows our Store class to publish (pub) the latter.

2- The `Store` is our state management class. It holds the more or less standard objects that 
are expected from a state management solution like `actions`, `mutations` and of course the `state`.
It also holds an `events` and a `status` object. 

- The `status` is used internally to know if we are currently executing an `action` or `mutation`. For example,  
appropriate console log information or a warning when the state is being changed directly outside of a mutation.

- The `events` is an instantiation of the `PubSub` class. When the `state` is being mutated, the Store 
publishes the `stateChange` event along with the new `state` as a payload.

3- The `Component` class is the parent class of all our created components. In the current implementation:

- The children have a `render` function that renders their output to their `element` property, the HTML element they mount to.

- When the children components are instantiated, they in turn instantiate the 
parent Component class in their constructor, passing the `store` to the latter. 

- The parent `Component` class subscribes to the `stateChange` event and calls the `render` function 
when the event is published by the `store` (upon changes to the `state`), thus making the child components re-render (reactive).  

An in depth tutorial on this is available here [CSS-Tricks tutorial](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript).

## Demo

You can see the end result [here](https://got.quiz.cinema.ttic.ca/)


## Installation

- clone the rero

`git clone `

- navigate to directory

`cd vanilla-js-state-management`

- install dependencies (`server` as a basic server and `Jest`, `Babel` for running tests)

`npm install`

- start the server on localhost:8080

`npm run serve`

## Testing

- run tests

`npm run test`

- run tests and generate coverage reports

`npm run testCoverage`