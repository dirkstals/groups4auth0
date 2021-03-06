
# Auth0 Extension for miaa Guard

## Requirements

### Node

Node >8 is required.
https://github.com/nvm-sh/nvm

## Installation

Install all npm dependencies with the following command.

```
npm install
```

## Development

1 environment variable is required. 
- `CDN`, where your files are hosted.

Create a `.env` file with the variable inside.

```
CDN=https://your-cdn-host/your-optional-subfolder
```

Start the development server (http://localhost:3000) with the following command.

```
npm start
```

### Watching with nodemon

It will watch all files inside `src/` for changes and will reload the app when the change has happened.

## Deployment

For a deployment a new version needs to be created. Use the following command. After this command, the deploy will start automatically. 

```
npm version (major|minor|patch)
```

For Auth0 extension installation. It is best to upgrade the minor version.

This will increase the version in `package.json` and the script `postversion` will run.

### Post versioning

After the versioning is done it will continue with undoing the current git commit because more files will change and need to be committed.

The script will then sync the version of `webpack.json` to the newly updated version in `package.json`.

After this it will start the build, which will create a `build/bundle.js` file.

At last, all changed files will be commited and pushed to the git repo.

