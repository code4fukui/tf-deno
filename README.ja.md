# tf-deno

[
![tfjs version](https://img.shields.io/badge/tfjs-v4.22.0-orange)
](https://www.npmjs.com/package/@tensorflow/tfjs/v/4.22.0)

Deno向けの[TensorFlow.js](https://www.tensorflow.org/js)。設定不要（out-of-the-box）でWebGPUアクセラレーションを利用できます。

このモジュールは、Denoおよびブラウザ環境でTensorFlow.jsをシームレスに利用する方法を提供し、Deno環境では高性能なWebGPUバックエンドを自動的に設定します。

## 主な特徴

-   **ユニバーサルモジュール**: 1つのインポートでDenoとブラウザの両環境で動作します。
-   **自動WebGPUバックエンド**: Deno環境ではデフォルトでWebGPUバックエンドを使用するようにTensorFlow.jsを設定し、パフォーマンスを大幅に向上させます。
-   **互換性パッチ**: ユーザーのハードウェアがサポートする機能のみをリクエストすることで、WebGPU初期化時のエラーを防ぐ重要な修正が含まれています。
-   **シンプルなAPI**: `tf`をインポートするだけで、すぐに開発を始められます。

## クイックスタート

Denoまたはブラウザのプロジェクトで、メインモジュールのURLを使用します。

```js
import { tf } from "https://code4fukui.github.io/tf-deno/tf.js";

// シンプルなテンソルを作成して出力
const a = tf.tensor1d([1, 2, 3, 4]);
a.print();

// 使用中のバックエンドを確認
console.log("Using backend:", tf.getBackend());
```

## 使用例

ローカルのサンプルを実行するには、Denoを使用し、ネットワークアクセスとWebGPUの権限を付与する必要があります。

```sh
# 基本的な構文
deno run --allow-net --allow-env --allow-read --allow-ffi [file_name.js]
```

-   **`bench1.js`**: WebGPUとCPUでの行列乗算のパフォーマンスを比較します。
    -   *この種の演算では、WebGPUの方が30倍以上高速になるという結果がよく見られます。*
-   **`test1-print.js`**: テンソルを作成して出力する基本的な「Hello World」のサンプル。
-   **`test2-patternmatch.js`**: コサイン類似度（Cosine Similarity）とユークリッド距離（Euclidean Distance）の両方を使用して、既知のパターン群からクエリベクトルに最も近いものを検索するサンプル。
    -   **ライブデモ**: [test2-patternmatch.html](https://code4fukui.github.io/tf-deno/test2-patternmatch.html)

## 仕組み

エントリポイントである `tf.js` は、環境を検出する小さなローダーです。
-   **Deno**環境では `tf-deno.js` をインポートします。これにより、NPMから `@tensorflow/tfjs` と `@tensorflow/tfjs-backend-webgpu` バックエンドを読み込み、GPU互換性パッチを適用して、WebGPUをバックエンドとして設定します。
-   **ブラウザ**環境では `tf-br.js` をインポートし、CDNから標準的なブラウザ互換版のTensorFlow.jsを読み込みます。

これにより、どこにデプロイしても効率的に動作する、ユニバーサルな機械学習コードを記述できるようになります。

## ライセンス

[MIT](LICENSE)
