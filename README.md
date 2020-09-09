# コミット

```
追加：他のサイトからコピペで文章を貼り付けられる
追加：ボタンを押すと編集エリアが作成される
```

# editor.formatter

## グローバルの設定値を取得

### get

引数のフォーマットの設定値を取得する

```
editor.formatter.get('bgBlue')
→
classes: ["bgBlue"]
deep: false
remove: "none"
selector: "p"
split: undefined
```

### has

引数のフォーマットがformatsプロパティに登録されているかどうか

```
editor.formatter.has('bgBlue')
```


## formatの追加・削除・トグル・確認

### apply

特定のformatを適用する

```js
onAction: function (_) {
  editor.formatter.apply('bgRed');
},
```

### remove

formatを適用している場所にある特定のformatを削除

```js
onAction: function (_) {
  editor.formatter.remove('bgRed');
},
```

### toggle

該当箇所にformatがあれば削除・無ければ追加

```js
onAction: function (_) {
  editor.formatter.toggle('bgRed');
},

```

### match

該当箇所に引数のformatが適用されているかどうか

```js
onAction: function (_) {
  editor.formatter.match('bgRed');
},

```