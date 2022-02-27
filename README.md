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
Initial backend setup:
```
# navigate to repo_root/backend
cd backend

# create a virtual environment
python3 -m venv .venv

# activate the virtual environment
source .venv/bin/activate

# install packages (could take a while, only need to do this once)
pip3 install -r requirements.txt

# Some django DB stuff
python3 manage.py makemigrations
python3 manage.py migrate

# create a super user for editing and inspecting the db
python3 manage.py createsuperuser

# more stuff
python3 manage.py migrate --run-syncdb

# run server
python3 manage.py runserver
```

To populate the server, login to `localhost:8000/admin/`.

Current APIs:

GET `/users`

GET `/room`

PUT `/status/<user_name>`

