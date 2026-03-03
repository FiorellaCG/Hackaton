import psycopg2
import sys
try:
    conn = psycopg2.connect(dbname='hackaton_db', user='postgres', password='12345', host='localhost')
except psycopg2.OperationalError as e:
    print(repr(e.pgerror))
except Exception as e:
    import traceback
    traceback.print_exc()
