# WeatherWay

https://user-images.githubusercontent.com/46355198/205980347-04de6311-edb9-4ca8-8f9c-83160576e77c.mp4


WeatherWay is a website that allows the user to input a minimum temperature and a weather specification and the user is then given the cheapest flights to locations within those parameters.

The user can also elect for a one-way flight, choose a non-stop flight, input their place of departure, and insert their departure date.

----------

Backend setup

0. Verify that you have python3 installed on your machine. If not, install it.
1. Clone this project to your local machine.
2. Create a virtual environment for this project using `python3 -m venv env` inside the directory
3. Activate the virtual environment using the command `source env/bin/activate` Windows: env\Scripts\activate.bat
4. Install our current dependencies using the command `pip install -r requirements.txt`
5. (Unix) Navigate to the directory of your project and run the command `chmod u+x start.sh`. 
   (Windows) Execute `setEnvVars.bat`. 

6.(Unix) Execute `./start.sh` to start the application. 
   (Windows) Execute the command `flask run` to start the application. 

Navigate to http://localhost:5000. If you see "Hello World" it should be working.
