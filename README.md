# Left-On-Read-Project

Tools needed: React, Django, pip

Installing React: [React.JS setup tutorial](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)

[Installing Django](https://docs.djangoproject.com/en/4.0/topics/install/)

[Installing pip](https://pip.pypa.io/en/stable/)


## Setting up the extension locally

To get the extension up on your local device, clone this repository.

In the `frontend` directory, be sure to first run
```
npm install
```
to install everything and also get the required dependencies this project uses onto your local device.

After, run the following:
```
npm run build
```
to build the project which will be needed for getting the project up as a Chrome extension.

To run the project locally, do:
```
npm start
```

and go to `http://localhost:3000`in your web browser of choice to interact with the app. Note that this is not the Chrome extension yet.


On Google Chrome, go to the URL [chrome://extensions/](chrome://extensions/) to access Chrome Extensions and turn on Developer Mode on the top right. Then, click `Load unpacked` and select this project's `/build` folder which should be in base the `/frontend` folder. You should see the extension pop up in your extensions bar on the top right of Google Chrome.

Whenever you make changes to the frontend side of the project, you will need to rebuild the project via `npm run build` after making changes and repeat the steps above to load up the Chrome extension.

## Setting up Django

Make sure you've installed pip and pipenv.