## 事前準備

- Docker のインストール  
  https://docs.docker.com/get-docker/

- Docker のアカウントを取得  
  https://hub.docker.com/signup

- Node.js のインストール  
  https://nodejs.org/ja/

- knexfileのhostを127.0.0.1にしておく

## Docker環境

- kelp-auction-envディレクトリに移動

<pre>
# docker-compose up
</pre>

## API環境

- kelp-auction-apiディレクトリに移動
- パッケージをインストール
<pre>
# npm i
</pre>

- envファイル作成
<pre>
# cp .env.example .env
</pre>

- DB準備
<pre>
# npm run db
</pre>

※エラーになる場合は、phpMyadminからkelp_auctionを選択し、
下記SQL実行後に再度コマンドを叩く
<pre>
DROP DATABASE kelp_auction;
CREATE DATABASE kelp_auction;
</pre>

- 起動
<pre>
# npm run start
</pre>


## ※開発時

- docker-compose up  
  上記のコマンドで node サーバも立ち上がり、ts のホットリロードがかかる


## ※テスト時

- docker-compose up mysql phpmyadmin
- npm run test  
  上記のコマンドで DB のマイグレーション、シーディングが実行された状態でテストが実行される
