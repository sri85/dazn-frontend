#Introduction
The tests are written using `cucumberjs` and `protractor`. `Cucumber` allows 
3 amigos strategy which allows joint collaboration between Product Owner, QA and the developer.

## Pre requisties
1. [Nodejs](https://nodejs.org/en/)
2. [Docker](https://www.docker.com/)

## Running the tests
1. Clone the repository.
2. Navigate to `dazn-frontend` folder
3. Do `npm install`
4. Run `npm run webdriver-update`(This updates all the selenium drivers)
5. Run `npm run webdriver-start`(This starts the selenium server)
6. You can confirm whether the selenium server is running this by visiting this [URL]
(http://localhost:4444/wd/hub/static/resource/hub.html)
7. Open a new terminal window and run `npm test` which runs all the tests.

To shut the selenium server just press ctrl+c in terminal window where the selenium server is running.

## Reports
I have used ``cucumber-html-reporter`` to generate the reports and once the tests are run
you can find the report `cucumberReport.html` under ``htmlReports`` folder.


## Video Recording

As an additional feature this framework uses zalenium for recording videos
, to use this , run ``docker-compose up -d`` . Run the tests by running `npm test`
in your terminal. Once the tests are run if any tests fail you can find the recorded videos
under ``e2e-videos`` folder . If you want to see the tests running you can see them
by visiting [URL](http://localhost:4444/grid/admin/live)

## FootNotes

Sometimes the pages take too long too load(Usually the very first time) and tests might fail(the tests wait for a max of 10 secs)
, if this happens please re run the tests.








