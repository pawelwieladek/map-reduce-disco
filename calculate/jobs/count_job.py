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

if __name__ == '__main__':
    input_file = sys.argv[1]
    current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__))) + "/"
    job = Job().run(required_files=[os.path.normpath(current_directory + "../model/log.py")],
                    input=[os.path.normpath(current_directory + "../../generate/target/" + input_file)],
                    map=map,
                    reduce=reduce)
    for word, count in result_iterator(job.wait(show=True)):
        print(word, count)
