# Bookbrooch

An app where users can save their favorite quotes, search for more quotes and play quote-related games.

## Project roles
Scrum - Yasien
DevOps - Sumithra
UX - Abdullah
QA - Manoela


## Set up 
Make sure you have Git and Node (v18) installed.

1. Use this template, clone your copy, `cd` into it
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the local dev server

Notes:

// Vercel does not currently work.
// Semantic Markup is not fully implemented yet.

## User Stories

- [x] As a user I want to be able to create a private profile so I can save my quotes privately.

- [x] As a user, I want to be able to type a quote and save to my page.

- [x] As a user I want to be able to tag my quotes so I can organise them by theme.

- [x] As a user I want to be able to sort quotes by category so I can keep them organised.

- [x] As a user I want to have the option to play games related to quotes so I am more literate.

- [ ] As a user I will need some rewards and prompting to log new quotes regularly so I am more motivated to read.

- [x] As a user who spends a lot of time in front of the screen, I want to view in dark mode so that I can protect my eyes.

- [ ] As a forgetful user, I'd like the application to be descriptive enough so I can navigate easier around it. 



## Introduction 

- What are you building?

An app where users can save their favorite book quotes, search for more quotes and play quote-related games.

- Why are you building it?

To fill a gap in the market since there does not currently exist (as far as we know) an app that integrates all the above functionality in one place (i.e. there are note apps and quote apps but no note-quote apps, much less one that also has games).

## Project scope 

- What are you not building?

A social app where you can view other people's quotes and connect with them.


- How did you decide what features were important?

We discussed as a team (including with the Product Owner) which features were most important. We then tested a prototype with users and took account of the feedback they provided before finally agreeing a priority order for our sprint backlog.

## Project plan 

- How are you going to structure your sprints?

We will spend the first week on Design and user testing/validation to come up with a high-fidelity prototype (figma) and clear user stories. We will translate user stories into broken down issues with accompanying estimation labels.

Week 2 and 3 will be week-long sprints where we will attempt to fulfill the user stories in our current sprint backlog. At the end of the week we will calculate our velocity by comparing our actuals to our estimates and then prioritise the issues to be completed in the next week-long sprint.

- What order are you going to build in?

We will build the pages simultaneously, creating some components on each, splitting our developer team to work on different parts of the app in order to cover more ground.


- How did user research inform your plan?

We conducted thirty-minute interviews with eight diffrent people who are representative of our target user group. During these interviews we asked over twenty questions to get a better idea of the kinds of things they would want in a quote app. As a result, we made the decision to focus solely on book quotes and not include movie quotes/lines. 

Subsequently, we invited those same users back to participate in testing a prototype of our app. From this we received useful feedback such as "the badges pae is a bit confusing" and "I really love the games page". This helped to guide our issue prioritisation.

## Requirement analysis 

- How will you ensure your project is accessible to as many users as possible?

With the help of the Google Lighthouse extension we can easily find some of the more obvious accessibility issues and address them. 

Moreover, we will test the keyboard-navigability of the app ourselves and fix any potential issues we identify.

Lastly, we will refer to the a11y accessibility guidelines and check our app against them to see if it meets the standard.

P.S Our user research provided valuable feedback on accessibility; we were unaware that a "dark mode" button is actually an accessibility feature . Once informed however, we included this as a user story (and later built it). 

- Are there any legal or regulatory requirements you should consider?

We are considering having an option for the user to post quotes to the public. We should consider checking the content they send and ensure it is clean, not claiming ownership etc.

## Project learnings 

- Did your team work effectively?

We adopted a workflow we all felt confortable with. Our routine would consist of a group discussion, followed by 50 minutes (two pomodoros) of pair-programming and then a 10 minute break. 

After this we got back together as a group, discussed progress and merged new changes or were given more time to complete work. We ensured the tasks at hand were small enough to be finished within the timeframe. We only moved on to start tackling new issues that were high in priority on our project board.

- What would you do differently next time?

We would be a bit more conservative in estimating the difficulty of issues and how long it would take to solve them. Our initial goals for the multiplicity of functionalities and features our app would have were perhaps a tad too ambitious given the limited time available to build.

## Research and findings 

- What did you find out from user testing?

Users were interested in the overall idea of a quote app. They liked the game feature and wanted to be able to share their quotes with their friends. They valued security and privacy. Also users thought that the app will improve their reading as they would be eager to save quotes. Most users agreed on the feature to tag quotes with a theme so they can then sort their quotes by tag.

## Project outcomes 

- Were your assumptions right or wrong?
- Recommendations and conclusions 
- What features would you prioritise to build next?
- Was the project a success?

## Software Development Lifecycle stages 

### Planning 
- What roles did your team take on?

Scrum: Yassien.
DevOps: Sumithra.
QA: Manoela.
UX: Abdullah.


- Explain the roles and responsibilities of all people working within the software development lifecycle, and how they relate to the project (K2)

Scrum: Leading on sprint planning, prioritising the issues, standups and making sure we were on track to achieve our goals. 


- Did these roles help your team work effectively?
- Outline how teams work effectively to produce software and how to contribute appropriately (K6) Compare and contrast the requirements of a software development team, and how they would ensure that each member (including themselves) were able to make a contribution (K6)

### Analysis 

- What might be the intended and unintended consequences of building this product?

Intended positive consequences are users will learn more quotes, have fun and ends up reading more. The app will be easy to use and understand.

Intended negative consequences may be people spend more time reading and less time doing sports.

Unintended positive consequences are people might elect better/more talented politicians if they read quotes from past leaders.

Unintended negative consequences are nobody may use the app. There may be data breaches and users may get exposed. There may be a chance the users might lose all their data.

### Design 

- How did you plan a user experience?

We designed a prototype of what we think the user would like to see and use on our app, then we conducted some user research and amended our features to reflect the feedback that we got.

- What technical decisions did you make?
we decided to use the following tech stack
React, NextJS, Chakra-UI, Firebase and Vercel.

- Server-render vs client-render vs both
We are doing both Server and Client side rendering.

- Relational or non-relational or no DB

Non-relational DB (Firebase).

- Self-hosted or platform-as-a-service
Self-hosted on Vercel.

- Frontend first vs DB first

We started with creating the database structure. Then, we started building the frontend.


- Did you create a technical specification?

- Review methods of software design with reference to functional/technical specifications and apply a justified approach to software development (K11, S11, S12)

### Implementation/Build 

- How did you ensure your code was good?
 We made sure the variable and function names are meaningful. We made sure to have reusable components to avoid code duplicates.
 
- Create logical and maintainable code to deliver project outcomes, explaining their choice of approach. (S1)

- What interesting technical problems did you have to solve?

- Outline and apply the rationale and use of algorithms, logic and data structures. (K9, S16)

- How did you debug issues that arose?
- Apply structured techniques to problem solving to identify and resolve issues and debug basic flaws in code (S7)

### Test 

- How did you verify your project worked correctly?
 
Mostly we did unit testing using console logs to make sure the logic is working correctly.

We also used Cypress end-to-end testing to verify our project.

- Identify and create test scenarios which satisfy the project specification (S6)
We created general tests replicating a user journey which takes them through our website.

- Did writing automated tests catch any bugs?


- Analyse unit testing results and review the outcomes, correcting errors. (S4)
Unit testing results are of great help to identify and solve the issues. 

### Deploy 

- Where/how did you deploy your application?

Vercel.

- Review and justify their contribution to building, managing and deploying code into the relevant environment in accordance with the project specification (S10)

- What problems did you encounter during deployment?

At some point we ran into an issue with env variables and our deployed app stopped working.

### Maintain 

- Is it easy for someone make changes to the codebase?
- Could a new person quickly be onboarded to contribute?
- Establishes a logical thinking approach to areas of work which require valid reasoning and/or justified decision making (B2)



- Describes how they have maintained a productive, professional and secure working environment throughout the project activity (B3).





//should this bit go under a 'Security' heading somewhere?
We are using a secure external authentication provider in order to stay safe and ensure we keep user's credantials private.
