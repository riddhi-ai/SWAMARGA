from sqlalchemy import text
from app.database import engine


try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

        print("================================")
        print("DATABASE CONNECTION SUCCESSFUL")
        print("Result:", result.scalar())
        print("================================")

except Exception as e:
    print("================================")
    print("DATABASE CONNECTION FAILED")
    print("Error:", e)
    print("================================")