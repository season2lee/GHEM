import pymysql

conn = pymysql.connect(host='j8d107.p.ssafy.io', user='root', password='d107', db='ghem', port=3306, charset='utf8')
mysql_cur = conn.cursor()