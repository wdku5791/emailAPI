# Email Service
An API that allows users to submit emails by request.

# How to use API

Get request for jobs endpoint where queryString is your query;
```
curl http://127.0.0.1:3000/emails?queryString
queryString example is to=example@gmail.com&text=exampleText&subject=Subject&from=example@gmail.com
```
If job complete, returns 'message sent' and check the inbox.
If job incomplete, tells you which error occured and switches up email api service.

# Requirements
Express, Require

# Setup
- Run in command line in root directory:
```
npm install
```
- Fill out .env file but api stuff is hardcoded for this example
```

# Startup
- Run in command line in root directory:
```
npm run start
```