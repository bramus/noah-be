# Noah.be Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/d4da30a4-0265-43f1-87d4-c31c912f6da9/deploy-status)](https://app.netlify.com/sites/noah-be/deploys)

## Developing

- Clone this repo

```
git clone git@github.com:bramus/noah-be.git
```

- Install NPM Dependencies using `yarn`

```
yarn install
```

- Start Webpack Dev Server

```
yarn start
```

- Edit files located in `./src`

## Deploying

The site is continously deployed on [Netlify](https://www.netlify.com/). Whenever `master` is pushed to Github, a new build will be made.

In case you want to manually build the site, run this:

```
yarn build
```

The result can be found in the `./build` folder