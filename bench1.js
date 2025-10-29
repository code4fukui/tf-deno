import { tf } from "./tf.js";

const size = 1320;

const bench = async (name) => {
  const t0 = performance.now();
  for (let i = 0; i < 10; i++) {
    const a = tf.randomNormal([size, size]);
    const b = tf.randomNormal([size, size]);
    const c = a.matMul(b);
    console.log(`Iteration ${i}: sum =`, (await c.sum().data())[0]);
    await tf.nextFrame(); // GPU計算をキューに流して一息入れる
  }
  console.log(name, performance.now() - t0, "msec");
};

await bench("WebGPU"); // WebGPU 961.733 msec (x34.3 faster than CPU) MacBookAir M4 2025 

await tf.setBackend("cpu");
await tf.ready();
await bench("CPU"); // CPU 32995.221583 msec MacBookAir M4 2025
