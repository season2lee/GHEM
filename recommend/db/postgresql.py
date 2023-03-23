import psycopg2 as db


conn_string="host='j8d107.p.ssafy.io' user='postgres' password='d107' port=4002"
postgre_conn=db.connect(conn_string)
postgre_cur=postgre_conn.cursor()
