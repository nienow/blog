# Advanced Guide to Module Federation

There are plenty of articles about setting up Webpack's Module Federation. 
But almost all the articles focus on the basics. 
Here I will go over steps you want to consider in a production app.

## Dynamic Imports

Most examples show using the *remotes* array to specify remote apps:

```javascript
remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js'
}
```

There are a couple of limitations in this approach:
1. The *remoteEntry.js* files get fetched immediately when your container app loads. This is not ideal if you have a large list of apps.
2. Your options for dynamically setting the URL is more limited.

Some possible scenarios where you need to change the URL of the remote app:
1. You have multiple environments (local, dev, beta, prod)
2. The apps you load are based on the user, or their region

## Shared Libraries

## Share Files
 You can expose static files like JSON

## Use Web Components

## Custom Router

It will wait for the remote to load before navigating

## Prefetch remotes

## Separate build config for running alone???

## RemoteApp components

## Cache Busting

## Dynamic URLs - env variables
