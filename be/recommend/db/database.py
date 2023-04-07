import asyncpg
import aiomysql
from contextlib import asynccontextmanager

# PostgreSQL database configuration
POSTGRE_DB_CONFIG = {
    'user': 'postgres',
    'password': 'd107',
    'host': 'j8d107.p.ssafy.io',
    'port': 4002,
}

# MySQL database configuration
MYSQL_DB_CONFIG = {
    'user': 'root',
    'password': 'd107',
    'host': 'j8d107.p.ssafy.io',
    'port': 3306,
    'db': 'ghem',
    'charset': 'utf8'
}

@asynccontextmanager
async def get_postgres_connection():
    conn = await asyncpg.connect(**POSTGRE_DB_CONFIG)
    try:
        yield conn
    finally:
        await conn.close()


@asynccontextmanager
async def get_mysql_connection():
    conn = await aiomysql.connect(**MYSQL_DB_CONFIG)
    try:
        yield conn
    finally:
        conn.close()


