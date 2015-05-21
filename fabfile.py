import os
from fabric.api import local
from datetime import datetime

def run():
    current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__)))
    filename = "generated-" + datetime.now().strftime("%Y-%m-%d-%H-%M") + ".txt"

    generate_app = current_directory + "/generate/dist/app.js"
    generate_options = "--file " + filename + " --verbose"

    local("node " + generate_app + " " + generate_options)

    count_job = current_directory + "/calculate/jobs/count_job.py"
    count_job_options = filename

    local("python " + count_job + " " + count_job_options)
