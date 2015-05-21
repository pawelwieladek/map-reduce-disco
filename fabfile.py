from fabric.api import local
from datetime import datetime

def hello():
    filename = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
    print(filename)
    local("ls -la")
