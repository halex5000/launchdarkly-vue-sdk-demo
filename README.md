# Where's the best Vue around? <br>The one that was launched darkly!

## Introduction

First, a quick start of Vue, I won't dig in deep because there are far better places to learn Vue than from me, like the [official Vue.js website](https://vuejs.org/guide/introduction.html).

If you're really new to web development, this is going to go fast, but you should have what you need to get started and then you can jump in the way back machine to go unpack all the things we went through at light speed.

I love acceleration, so I'm going to give you the fastest start I can. 
My favorite thing when I'm learning something new is to skip all the things I don't care too much about (for now) and get right down to the important stuff.

If you don't want the backstory, [jump to the doing!](#lets-go-build)

Also, if you're not so much of the reading type and you want a guided video tour, check this out on YouTube.

In this example, I think I've got the shortest route to a deployed working Vue app with Feature Management through LaunchDarkly. 
I'm sure there are opportunities to optimize, improve the workflow, but I think this should give you an example that will get you off the ground fast and grok how things work.

Since we're going to go fast, I won't do my explaining of how Vue works here, but rather through comments in the code. I will make sure to explain all the things I do with LaunchDarkly in this project though.



## Project Setup Explanation [:fast_forward:](#lets-go-build)

A couple of things that tend to drive my choices in setting up a project or building an app:

### I have 99 problems

I have lots of problems to solve, I want to focus on the ones that matter most **first** so I use tools to get lower priority problems out of my way, for me they're accelerators.

1. **Problem #27** - I need to have a site that's pretty enough, but I am no designer.
   1. [PrimeVue](https://www.primefaces.org/primevue/) has a lot going for it, the docs feel a little sparse, I only went deep enough to demonstrate some of the power in launching darkly. Of the component libraries in the Vue space, [PrimeVue](https://www.primefaces.org/primevue/) felt the easiest to adopt with the least "other stuff" I had to do.
   2. There are some other popular options, each one comes with its own challenges. I found [this post](https://www.mindinventory.com/blog/vuejs-ui-component-libraries-frameworks/) particularly useful in finding some options with some obersvations about the pros & cons of each. Highly recommend!
   
2. **Problem #17** - Modern apps get bundled and bundling can be a pain, I need less pain.
   1. I chose [Vite](https://vitejs.dev/) as my bundler. I didn't want to spend a lot of time curating a bundler config to get this working and Vite made it extra easy to scaffold and get started. If you want to know more, check out the "why" behind [Vite](https://vitejs.dev/) here: https://vitejs.dev/guide/why.html
   2. You could use [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), or the [Vue CLI](https://cli.vuejs.org/). 
      I don't know enough about the options to recommend one, but I can say [Vite](https://vitejs.dev/) made my life easier and got me to production fast with very little config.
   
3. **Problem #13** - I need a place to run this thing.
   
   1. I need a [live demo link](https://launchdarkly-vue-demo.netlify.app/) so you can trust me that this actually works. and 
   
   2. It's just not worth the cognitive load to worry much about the "how" this gets out there because I know my project evolving
   
      I need a way to quickly:
   
      	- ship
      	- change
      	- repeat
   
   3. Enter [Netlify](https://www.netlify.com/). I'm not sure there's an easier way to run a web application than [Netlify](https://www.netlify.com/). 
      With a few quick commands, I had a new site setup for Netlify, hooks into my repo in Github so changes are automatically deployed, and I even had a place for injecting secrets into my app via Netlify all within their free tier.
   
      - I have included Netlify config file, `netlify.toml` which you can customize, use, or ignore, depending on how much :rocket: you want for free.
      - I have also included scripts to setup Netlify for you once you have an account and an access key.

### I :heart: to learn *fast*

1. I like to catch mistakes *sooner*
   1. I used [Typescript](https://www.typescriptlang.org/) in this project (don't @ me) here's why:
      1. If I had a relationship status with types, it would be `it's complicated`. 
      2. I love **some** typechecking at development and build time because it helps catch my mistakes sooner. 
         I used Typescript sparingly in this project to give me a little more confidence as I built.
      3. Types help me understand interfaces faster, so I :heart: when libraries ship their types so I don't need to look at their docs so much or worse yet, dig into their source code.
   2. I love TDD, [test-driven development](https://testdriven.io/test-driven-development/), for the same reason I like types. I chose not to include tests in this repo here because:
      - When I'm learning a new paradigm, testing actually feels like it gets in the way
      - I'm unfamiliar with testing in the Vue space, so I'll save that for another time.

## Let's go build!

### Prerequisites

1. [Node.js](https://nodejs.org/) & [NPM](https://docs.npmjs.com/cli) installed
   If changing versions is a pain for you, have you heard of [NVM](https://github.com/nvm-sh/nvm)?
   1. Node version `18.6+` recommended
   2. NPM version `8.13+` recommended
   3. I included a  `.nvmrc` in the template repo so NVM can automatically detect what you need for versions if you've got it installed.
2. [Git](https://git-scm.com/) installed
   1. You don't actually have to have it, it's just highly recommended.
   2. If you don't have it installed, it's really easy! Just follow these directions: [Git Install Instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 
3. A [Netlify](https://www.netlify.com/) account 
   1. Check out https://www.netlify.com/pricing/ 
   2. Sign up for Netlify Starter plan, it's free, no credit card required at the time of this writing.
   3. Once you're signed up, grab your access key
4. A [LaunchDarkly](https://launchdarkly.com) account
   1. Super easy to setup if you don't have one already: [SIgn Up Page](https://launchdarkly.com/pricing/)
   2. Everything you need to start dark launching is included in the starter package, so unless you need more, just start a free trial of the starter, no credit card required, no payment for the duration of your trial.

### Scaffolding

#### Here's how I scaffolded my app:

```zsh
# reference https://vitejs.dev/guide/#scaffolding-your-first-vite-project
npm create vite@latest launchdarkly-vue-sdk-demo -- --template vue
```

For you, I'm going to make it even easier thanks to a little help from my friend [degit](https://github.com/Rich-Harris/degit "straightforward project scaffolding")

```shell
# starts you with a shallow clone of my starter template on Github
npx degit halex5000/launchdarkly-vue-sdk-demo#stable my-project
```

Why `degit` from a template repo? I :heart: accelerators and [degit is faster](https://github.com/Rich-Harris/degit#wait-isnt-this-just-git-clone---depth-1) than cloning.

#### Once you degit, there's only a couple steps to get you live!

##### If you want to run locally, you can just follow these steps:

1. ```shell
   cd my-project
   ```

2. ```shell
   npm install	
   ```

3. ```shell
   npm run dev
   ```

4. If it all worked right, your app is running and it just opened in your local browser.





