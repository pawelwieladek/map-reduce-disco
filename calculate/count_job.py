from disco.core import Job, result_iterator

def map(line, params):
    for word in line.split("\t"):
        yield word, 1

def reduce(iter, params):
    from disco.util import kvgroup
    for word, counts in kvgroup(sorted(iter)):
        yield word, sum(counts)

if __name__ == '__main__':
    job = Job().run(input=["/home/disco/map-reduce-tv-channels/generate/target/generated-2015-05-21-10-59.txt"],
                    map=map,
                    reduce=reduce)
    for word, count in result_iterator(job.wait(show=True)):
        print(word, count)
