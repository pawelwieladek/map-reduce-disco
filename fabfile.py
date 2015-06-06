import os
from fabric.api import local
from datetime import datetime

def run():
    current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__)))
    local("cd generate")
    local("npm install")
    local("gulp build")
    local("cd ..")

    generate_task = current_directory + "/generate/dist/app.js"
    local("node " + generate_task + " --verbose")

    calculate_task = current_directory + "/calculate/jobs/count_job.py"
    local("python " + calculate_task)
