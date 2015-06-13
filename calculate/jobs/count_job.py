import os
import sys
import re
import time
import requests
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
    pattern = re.compile("^logs-")
    current_directory = os.path.realpath(os.path.dirname(os.path.realpath(__file__))) + "/"
    input_directory = os.path.normpath(current_directory + "../../generate/target/")
    input_files = [input_directory + "/" + file for file in os.listdir(input_directory)
                   if pattern.match(file) and os.path.isfile(os.path.join(input_directory, file))]
    job = Job().run(required_files=[os.path.normpath(current_directory + "../model/log.py")],
                    input=input_files,
                    map=map,
                    reduce=reduce)

    data = []
    timestamp = int(time.time())
    for word, count in result_iterator(job.wait(show=True)):
        datapoint = {
            "metric": "provider.channel.bps",
            "timestamp": timestamp,
            "value": count,
            "tags": {
                "provider": word[0],
                "channel": word[1]
            }
        data.append(datapoint)

    # POST to OpenTSDB
    headers = {'Content-type': 'application/json'}
    url = 'http://192.168.137.10:4242/api/put?details'
    req = requests.post(url, data=json.dumps(data), headers=headers)
    print(req.status_code, req.reason)
