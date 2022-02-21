# Left-On-Read-Project

Tools needed: React, Django, pip

Installing React: [React.JS setup tutorial](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)

[Installing Django](https://docs.djangoproject.com/en/4.0/topics/install/)

[Installing pip](https://pip.pypa.io/en/stable/)


## Setting up the extension locally

To get the extension up on your local device, clone this repository.

In the `left-on-read` directory, be sure to run
```
npm start
```
to get the application up and running. In a separate terminal, go to the same `left-on-read` directory and run
```
npm run build
```
to build the Chrome extension.

On Google Chrome, go to the URL [chrome://extensions/](chrome://extensions/) to access Chrome Extensions and turn on Developer Mode. Then, click `Load unpacked` and select this project's `/build` folder. You should see the extension pop up in your extensions bar on the top right of Google Chrome.

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

# run server
python manage.py runserver
```

Current APIs:
GET `/users`
GET `/room`
PUT `/status/<user_name>`
