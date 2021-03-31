# gh-find-pull-requests
指定したリポジトリのプルリクエスト一覧を表示する。  
業務でよくopenなPRのリストを作成する必要があるので。

`username url`で表示する。

## 使い方

### GitHubのアクセストークンの設定
環境変数`GITHUB_TOKEN`で取得できるようにしておく。  

### 依存関係のインストール

```
npm i
```

### 実行例

- Organization: example-org
- Repository: example-org/some-repo
- State: closed

`example-org/some-repo`のプルリクを取得

```
node index.js -o example-org -r some-repo -s closed
```

stateはデフォルトでは`open`になります。

### オプション
```
> node index.js -h
Usage: index [options]

Options:
  -o, --org <string>                      Organization name (owner)
  -r --repo <string>                      Repository Name (without organization name)
  -s --state <"open" | "closed" | "all">  Either open, closed, or all to filter by state (default: "open")
  -h, --help                              display help for command
```

## Licence
MIT
