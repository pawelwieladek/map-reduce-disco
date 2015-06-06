import os
import sys
from disco.core import Job, result_iterator

def map(line, params):
    from log import Log
    log = Log(line)
    yield (log.provider, log.channel), log.total_bytes

def reduce(iter, params):
    from disco.util import kvgroup
    for word, counts in kvgroup(sorted(iter)):
        yield word, sum(counts)

if __name__ == "__main__":
    current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__))) + "/"
    input_directory = os.path.normpath(current_directory + "../../generate/target/")
    input_files = [file for file in os.listdir(input_directory) if os.path.isfile(os.path.join(input_directory, file))]
    job = Job().run(required_files=[os.path.normpath(current_directory + "../model/log.py")],
                    input=input_files,
                    map=map,
                    reduce=reduce)
    for word, count in result_iterator(job.wait(show=True)):
        print(word, count)
