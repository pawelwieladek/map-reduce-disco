import unittest
from log import Log

class TestLog(unittest.TestCase):

  def test_init(self):
      log = Log("195.244.29.93	1430259015	tvp	122.150.177.147	oroca.edu/d873b3cb35fb8f71ec733ecb87dd493c3743fee7/tvp-kultura/11/319	Mozilla/5.0 (Windows NT 5.1) Gecko/20100101 Firefox/14.0 Opera/12.0	1199594	116154")
      self.assertEqual(log.node_ip, "195.244.29.93")
      self.assertEqual(log.timestamp, 1430259015)
      self.assertEqual(log.provider, "tvp")
      self.assertEqual(log.client_ip, "122.150.177.147")
      self.assertEqual(log.origin_server, "oroca.edu")
      self.assertEqual(log.session_id, "d873b3cb35fb8f71ec733ecb87dd493c3743fee7")
      self.assertEqual(log.channel, "tvp-kultura")
      self.assertEqual(log.quality_id, 11)
      self.assertEqual(log.fragment_id, 319)
      self.assertEqual(log.user_agent, "Mozilla/5.0 (Windows NT 5.1) Gecko/20100101 Firefox/14.0 Opera/12.0")
      self.assertEqual(log.total_bytes, 1199594)
      self.assertEqual(log.cache_bytes, 116154)

if __name__ == '__main__':
    unittest.main()
