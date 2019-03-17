# healthcheck-Lambda

Lambdaを利用して定期的にhealthcheckします。

環境変数、TARGETにhealthcheck先のURL、
SLACKPATHにhealthcheck失敗時の通知先に利用するSlackのURL
を入れ、Lambdaをデプロイするといい感じになります。
