# MP #2: New Clear REACTive App
### Due: March 11th, 2019, 11.59PM CDT

## Table of Contents
1. [Assignment](#assignment)
2. [Grading Breakdown](#grading-breakdown)
3. [Tips](#tips)
4. [Rules](#rules)
5. [Environment Setup Guide](#environment-setup-guide)
6. [Submission Details](#submission-details)

## Assignment

#### Task
In this programming assignment, you will implement a front-end interface using React that consumes an API. Please read through the entire MP before you start.

#### Requirements
Create a single-page React app that lets users interact with the data from one of the following APIs.
  - TMDB (https://www.themoviedb.org/documentation/api)
  - Spotify (https://developer.spotify.com/web-api/)
  - Pokemon (https://pokeapi.co/)
  - Marvel (https://developer.marvel.com/)
  - NASA (https://api.nasa.gov/index.html)

Note that you may need to create an account and/or acquire an API key for some of the APIs.
Additionally, the API you are working with may become temporarily unavailable.
If/when this happens, it doesn't mean you are blocked from working on the MP.
You can mock the data, i.e. create a local hard coded response and use that instead of making the request.
This is also a good opportunity to think about how your app should handle errors.

Your app should have the following features:
  - **A list view**:  where users can input a search query and the app returns a list of results that match the query (i.e. searching movies or albums). There should also be a way to sort the search results based on different properties of the results (such as the name or rank) and of specifying an ordering (ascending and descending). Also, the search bar should filter as you type. You can sort and filter in the client side.
  - **A gallery view**: that displays some kind of image media from the chosen API (gallery of movie posters). The gallery view should also have some kind filtering attribute where users can select one or many attributes and filter the gallery by them (i.e. genres of films or music).
  -  **A detail view**: When an item in the search view or the gallery view is clicked, the app should display the different attributes of the selected item. Also, this view should have previous and next buttons (can be implemented with arrows) that lets the user cycle through the list of objects.

You will also be required to use following tools:
  - Use React Router for routing.
  - Use Axios for API calls.
  - Use PropTypes. https://facebook.github.io/react/docs/typechecking-with-proptypes.html

## Grading Breakdown
Total Points : 50

List View:
  - Does the list view display relevant items from the chosen API ? (2 points)
  - Does the search bar filter down the items based on the search? (4 points)
  - Can you sort by at least 2 properties?  (4 points)
  - Can the properties be sorted in Ascending and Descending order?  (4 points)

Gallery View:
  - Is the gallery composed of item media?  (2 points)
  - Does clicking on a filter change the results?  (4 points)

Details View:
  - Does clicking on an item in List View take you to the Details View?  (5 points)
  - Does clicking on an item in Gallery View take you to the Details View?  (5 points)
  - Does the Details View contain item details?  (4 points)
  - Do the PREVIOUS and NEXT buttons work correctly?  (5 points)

Other:
  - Does the implementation use React Router and PropTypes?  (6 points)
  - Design (5 points)

## Tips
  - Start early! This is first MP that uses React so start ahead.
  - Visit https://reactjs.org/docs/faq-structure.html for examples on how to structure your React files.
  - You may use a React component library for this MP. We suggest Semantic UI.
  - We recommend using [Normalize.css](https://necolas.github.io/normalize.css/).
  - We recommend using [CSS Modules](https://blog.bitsrc.io/how-to-use-sass-and-css-modules-with-create-react-app-83fa8b805e5e).

### Should I use Hooks?
React Hooks are the newest React feature, released in React 16.8 on February 6, 2019.
They provide a way of writing React code without Javascript classes, but are completely optional.
Facebook explicitly recommends against rewriting existing code to use Hooks and makes it clear you do not need to use Hooks immediately.

For most students, we don't recommend using Hooks as they effectively provide a shortcut to various React Lifecycle methods, so it is important to understand the principles of React before utilizing Hooks.
In general, it is best to not try and learn too much at once.
Additionally, most online resources will not be updated to include Hooks.

However, if you already feel comfortable with React and would like to utilize this MP to learn Hooks you should feel free to do so.

## Rules
1. This is an individual assignment. No collaboration is permitted.
2. It is not permitted to copy/paste code that is not your own. You are, however, free to look at different code sources for inspiration and clarity. All sources (code as well as reading material) that you reference to complete this assignment must be declared in the submission.
3. There should be no use of inline styling.
4. No inline script tags should be used.
5. HTML tables cannot be used for layout.
6. If you think something you’re doing might not be acceptable, please ask on Piazza.
7. You must utilize some SCSS features (variables, mixins, etc). A plain CSS file will receive less points.
8. We *strongly* recommend using `Create React App` to get your MP started. If you ignore this, we will not help with any environment issues.

## Environment Setup Guide
1. Use `Create React App` (CRA) (see below) to generate your MP starter code in a directory of your choice.
2. CD into that directory and follow the instructions to make a new repository on either GitHub or GitLab. [Guide for GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) or [Guide for GitLab](https://docs.gitlab.com/ee/gitlab-basics/create-project.html#push-to-create-a-new-project).
3. Invite "UIUCWP-Bot" as the collaborator on GitHub or "uiuc-web-programming" on GitLab. If you use GitLab, make sure to invite the account as a reporter, not a guest, otherwise we can't see your code.
4. After running `npm start` open a browser and go to `http://localhost:3000/` to view your page.
5. Open up `src/app.js` to start building your first component. Visit https://reactjs.org/docs/getting-started.html for many official, high quality resources to help get you started.

Deploying to GitLab: Consult https://piazza.com/class/jqijjbb1ntc45n?cid=72 for instructions on how to deploy your site to GitLab pages when you are done. *Note* `create-react-app`'s configuration will put the built files into `build`, so you will need to change the appropriate path in the YML file.

OR

Deploying to GitHub: Consult the official FB docs for hosting on GH Pages with CRA - https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom.

### Create React App
`create-react-app` is a tool that allows you to generate a react starter project that requires no immediate configuration. Visit the [getting started guide](https://facebook.github.io/create-react-app/docs/getting-started) to read more.

You may be wondering how the command `npx create-react-app my-app` works and why there is no installation step. Click [here](https://www.bram.us/2017/07/15/introducing-npx-an-npm-package-runner/) for an explanation of `npx`.


## Submission Details
[Submission Form](https://uiucwp.typeform.com/to/BDDIeg)
