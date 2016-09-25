#!/bin/bash -eu

# 一発でMySQLのrootユーザーにすべてのホストからすべてのデータベースにすべての権限を与えるコマンド
# http://qiita.com/IKEA_dless/items/3b26f259dc8c526cbea2

# dockerのofficial-imageのmysqlを使って初回起動時にカスタムsqlを実行
# https://mistymagich.wordpress.com/2015/09/01/docker%E3%81%AEofficial-image%E3%81%AEmysql%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%88%9D%E5%9B%9E%E8%B5%B7%E5%8B%95%E6%99%82%E3%81%AB%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0sql%E3%82%92%E5%AE%9F%E8%A1%8C/


mysql=( mysql -uroot )

"${mysql[@]}" <<-EOSQL
    grant all privileges on *.* to root@"%";

    CREATE DATABASE IF NOT EXISTS foodbook_development;
    CREATE DATABASE IF NOT EXISTS foodbook_production;
EOSQL
