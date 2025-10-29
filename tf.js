// 1) これを一番最初に実行（tfjs を import する前）
const _origRequestDevice = GPUAdapter.prototype.requestDevice;
GPUAdapter.prototype.requestDevice = function (desc = {}) {
  if (desc && Array.isArray(desc.requiredFeatures)) {
    // adapter.features からサポート一覧を取得して、未サポートを除外
    const supported = Array.from(this.features ?? []);
    desc = {
      ...desc,
      requiredFeatures: desc.requiredFeatures.filter(f => supported.includes(f)),
    };
  }
  return _origRequestDevice.call(this, desc);
};

// 2) その後で tfjs + webgpu バックエンドを import
import * as tf from "npm:@tensorflow/tfjs@4.22.0";
import "npm:@tensorflow/tfjs-backend-webgpu@4.22.0";

await tf.setBackend("webgpu");
await tf.ready();

export { tf };
