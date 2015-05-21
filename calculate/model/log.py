class Log:
    def __init__(self, line):
        data = line.split("\t")
        self.node_ip = data[0]
        self.timestamp = int(data[1])
        self.provider = data[2]
        self.client_ip = data[3]
        url = data[4]
        self.user_agent = data[5]
        self.total_bytes = int(data[6])
        self.cache_bytes = int(data[7])
        url_data = url.split("/")
        self.origin_server = url_data[0]
        self.session_id = url_data[1]
        self.channel = url_data[2]
        self.quality_id = int(url_data[3])
        self.fragment_id = int(url_data[4])
