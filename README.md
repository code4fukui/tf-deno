# tf-deno

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

[
![tfjs version](https://img.shields.io/badge/tfjs-v4.22.0-orange)
](https://www.npmjs.com/package/@tensorflow/tfjs/v/4.22.0)

[TensorFlow.js](https://www.tensorflow.org/js) for Deno, with out-of-the-box WebGPU acceleration.

This module provides a seamless way to use TensorFlow.js in Deno and browsers, automatically configuring the high-performance WebGPU backend for Deno environments.

## Key Features

-   **Universal Module**: A single import works in both Deno and browser environments.
-   **Automatic WebGPU Backend**: Configures TensorFlow.js to use the WebGPU backend by default in Deno for significant performance gains.
-   **Compatibility Patch**: Includes a crucial fix to prevent errors during WebGPU initialization by requesting only the features supported by the user's hardware.
-   **Simple API**: Just import `tf` and start building.

## Quick Start

Use the main module URL in your Deno or browser project.

```js
import { tf } from "https://code4fukui.github.io/tf-deno/tf.js";

// Create and print a simple tensor
const a = tf.tensor1d([1, 2, 3, 4]);
a.print();

// Check the active backend
console.log("Using backend:", tf.getBackend());
```

## Examples

To run the local examples, you'll need to use Deno and provide permissions for network access and WebGPU.

```sh
# General syntax
deno run --allow-net --allow-env --allow-read --allow-ffi [file_name.js]
```

-   **`bench1.js`**: Compares the performance of matrix multiplication on WebGPU vs. CPU.
    -   *Results often show WebGPU is over 30x faster for this type of operation.*
-   **`test1-print.js`**: A basic "hello world" that creates and prints a tensor.
-   **`test2-patternmatch.js`**: An example of finding the best match for a query vector from a set of known patterns using both Cosine Similarity and Euclidean Distance.
    -   **Live Demo**: [test2-patternmatch.html](https://code4fukui.github.io/tf-deno/test2-patternmatch.html)

## How It Works

The entry point `tf.js` is a small loader that detects the environment:
-   In **Deno**, it imports `tf-deno.js`, which pulls in `@tensorflow/tfjs` and the `@tensorflow/tfjs-backend-webgpu` backend from NPM, applies the GPU compatibility patch, and sets WebGPU as the backend.
-   In a **browser**, it imports `tf-br.js`, which loads the standard browser-compatible version of TensorFlow.js from a CDN.

This allows you to write universal machine learning code that runs efficiently wherever you deploy it.

## License

[MIT](LICENSE)