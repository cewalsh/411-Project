
0. Verify that you have python3 installed on your machine. If not, install it.
1. Clone this project to your local machine.
2. Create a virtual environment for this project using `python3 -m venv env` inside the directory
3. Activate the virtual environment using the command `source env/bin/activate`
4. Install our current dependencies using the command `pip install -r requirements.txt`
5. (Unix) Navigate to the directory of your project and run the command `chmod u+x start.sh`. 
   (Windows) Execute `setEnvVars.bat`. 

6.(Unix) Execute `./start.sh` to start the application. 
   (Windows) Execute the command `flask run` to start the application. 

Navigate to http://localhost:5000. If you see "Hello World" it should be working.