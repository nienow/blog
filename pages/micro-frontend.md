# This website uses a *Micro Frontend* architecture

## What are micro frontends?

A micro frontend architecture is defined by the presence of multiple, purpose-built apps that are stitched together to look and function like one big app.

## Why use micro frontends (in general)?

Perhaps the biggest reasons to use micro frontends is to allow teams to build and focus on smaller chunks of the application. A team would own their frontend(s), and it would be independently runnable, testable, and deployable.
Each team could choose a technology stack that works for them and their requirements.

## Why did I use micro frontends?

With myself being the only developer on this project, it normally would not make sense to use this architecture. However, there were a few good reasons to pursue it:
1. I wanted to better understand the architecture, and hopefully improve it.
2. I wanted to be able to experiment with different frameworks / libraries (part of the site in react, part in svelte, etc).
3. I wanted separate repos for the different parts of the site, in order to use them for examples in my articles.

## List of apps

### Main Apps
1. Container - Contains the header, footer, and router
2. Article - handles static pages that are written using markdown (blog articles and static pages like this page). %RANDOMBITS_REMOTE_BLOG%

### Tools
1. Snowrunner save editor
