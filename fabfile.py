import os
from fabric.api import local
from fabric.context_managers import cd
from datetime import datetime

current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__)))

def clean():
    with cd("generate"):
        local("npm install")
        local("gulp build")

def generate():
    generate_task = current_directory + "/generate/dist/app.js"
    local("node " + generate_task + " --verbose")

def calculate():
    calculate_task = current_directory + "/calculate/jobs/count_job.py"
    local("python " + calculate_task)

def run():
    clean()
    generate()
    calculate()
