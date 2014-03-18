#!/bin/bash
echo "#!/bin/sh" >> start.sh
echo "What's the name of your postgres DB? "
read pgname
echo "export DATABASE_URL=\"postgres://127.0.0.1/${pgname}\"" >> start.sh
echo "node bot" >> start.sh
echo "Creating tables...."
psql -d $pgname < sql/default.sql
echo "Done!"
chmod +x start.sh
