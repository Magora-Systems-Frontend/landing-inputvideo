## Quickstart

1.  Install the [node.js](https://nodejs.org)
2.  Add .env file as .envExample. Set appropriate values
    ```bash
    cp .envExample .env
    ```
3.  Go to project folder and run
    ```bash
    npm run setup
    ```
4.  Start dev server
    ```bash
    npm start
    ```
5.  In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)

## Main tasks

- `npm run dev` - launches watchers and server
- `npm run build` - compile a project
- `npm run zip` - compile a project in zip
- `npm run deploy` - compile a project and push in `build` branch to git repository
- `npm run cleanup` - remove demo app

## Module generator

Create empty module by name in `source/modules` folder

By default generate only `*.pug` and `*.styl` files.

You can call `amo` with additional params like `js` and `yml`

```sh
npm run amo <module-name> [js || yml]
```

## License

[The MIT License (MIT)](LICENSE)
