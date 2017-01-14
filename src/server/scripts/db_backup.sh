#!/bin/sh
# http://qiita.com/Jey/items/b94958491bb6611a5666

DATE=`date '+%d'`
DUMPCMD="docker exec -it docker_mariadb_1 mysqldump -uroot"
DB_NAME="foodbook_production"
PASS="urpasswd"

$DUMPCMD \
$DB_NAME | gzip > ~/dbbackup2/db-dump.${DATE}.sql.gz

# 一応echoって書いてるけど、hipchatとかに飛ばすとたのしい
echo "dump completed"
