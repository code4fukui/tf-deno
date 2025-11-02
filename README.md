# tf-deno

[TensorFlow.js](https://www.tensorflow.org/js) for Deno and browsers

## usage

```js
import { tf } from "https://code4fukui.github.io/tf-deno/tf.js";

const a = tf.tensor1d([1, 2, 3, 4]);
a.print();
```

## sample

```sh
deno bench1.js
deno test1-print.js
deno test2-patternmatch.js
```
- [test2-patternmatch.html](https://code4fukui.github.io/tf-deno/test2-patternmatch.html)

## checked version

- ok: [@tensorflow/tfjs@4.22.0](https://www.npmjs.com/package/@tensorflow/tfjs?activeTab=versions)
