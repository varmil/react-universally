#!/bin/sh
# http://qiita.com/Jey/items/b94958491bb6611a5666

DATE=`date '+%d'`

DB_NAME="foodbook_production"
PASS="urpasswd"
DUMPCMD="docker exec -i docker_mariadb_1 mysqldump -uroot"

OUTPUT_DIR=~/dbbackup2/

mkdir -p $OUTPUT_DIR

$DUMPCMD \
$DB_NAME | gzip > ${OUTPUT_DIR}db-dump.${DATE}.sql.gz

# 一応echoって書いてるけど、hipchatとかに飛ばすとたのしい
# echo "dump completed"
