const omittedContent = (title) => {
  // 定数で宣言
  const MAX_LENGTH = 20

  // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
  if (title.length > MAX_LENGTH) {
    // substr(何文字目からスタートするか, 最大値);
    return title.substr(0, MAX_LENGTH) + '...'
  }
  // 文字数がオーバーしていなければそのまま返す
  return title
}

export default omittedContent
