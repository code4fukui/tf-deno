import { tf } from "./tf.js";

// コサイン類似度＝向きの近さ、ユークリッド距離＝形そのものの近さ

// === 学習済みパターン的なもの（DB） ======================
// 例えば 5次元特徴量を3パターン登録してあるとする
const patternData = [
  [0, 1, 0, 1, 0], // pattern A
  [1, 1, 1, 0, 0], // pattern B
  [0, 0, 1, 0, 1], // pattern C
];

// === 照合したい入力パターン ==============================
//const queryData = [0, 1, 0, 1, 0]; // クエリ
const queryData = [0.1, 0.1, 0.1, 0, 0.]; // クエリ

// Tensor に変換
const patterns = tf.tensor2d(patternData);  // shape [numPatterns, dim]
const query = tf.tensor2d([queryData]);     // shape [1, dim]

// コサイン類似度:
// cos_sim(a,b) = (a・b) / (||a|| * ||b||)
const cosineSim = tf.tidy(() => {
  const dot = tf.matMul(patterns, query, false, true) // [numPatterns,1]
                  .squeeze();                         // [numPatterns]

  const patternsNorm = patterns.norm('euclidean', 1); // L2 norm for each row -> [numPatterns]
  const queryNorm = query.norm('euclidean', 1);       // [1]
  const denom = patternsNorm.mul(queryNorm);          // broadcast -> [numPatterns]

  return dot.div(denom); // [numPatterns] 大きいほど似てる (1が完全一致)
});
// 結果を取り出し
const cosVals = await cosineSim.array();      // 例: [1.0, 0.58, 0.41] 的な
console.log("=== Cosine Similarity (大きい=似てる) ===");
cosVals.forEach((v, i) => {
  console.log(`Pattern ${i}: ${v.toFixed(4)}`);
});

const bestByCosine = cosVals
  .map((v, i) => ({ i, v }))
  .sort((a, b) => b.v - a.v)[0].i; // 降順で最大
console.log("向きが最も似てる(コサイン類似度): Pattern", bestByCosine);


// ユークリッド距離:
// dist(a,b) = sqrt(sum((a-b)^2))
const euclideanDist = tf.tidy(() => {
  // query を numPatterns 個に複製して patterns と同じ shape にそろえる
  const repeatedQuery = query.tile([patterns.shape[0], 1]); // [numPatterns, dim]

  const diff = patterns.sub(repeatedQuery); // [numPatterns, dim]
  const sq = diff.square();                // [numPatterns, dim]
  const sumSq = sq.sum(1);                 // [numPatterns]
  return sumSq.sqrt();                     // [numPatterns] 小さいほど似てる (0が完全一致)
});

// 結果を取り出し
const distVals = await euclideanDist.array(); // 例: [0.0, 2.0, 1.73] 的な

console.log("=== Euclidean Distance (小さい=似てる) ===");
distVals.forEach((v, i) => {
  console.log(`Pattern ${i}: ${v.toFixed(4)}`);
});

// それぞれの指標で一番似てるインデックスを求める
const bestByDistance = distVals
  .map((v, i) => ({ i, v }))
  .sort((a, b) => a.v - b.v)[0].i; // 昇順で最小

console.log("形が最も似てる(ユークリッド距離): Pattern", bestByDistance);

// メモリ解放
patterns.dispose();
query.dispose();
cosineSim.dispose();
euclideanDist.dispose();

// tf.memory() でリーク確認用
const mem = tf.memory();
//console.log(mem);
