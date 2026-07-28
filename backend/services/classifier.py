"""
Fashion Classifier Service — Pure NumPy Inference Engine.

Loads pre-trained CNN weights from a .npz file and runs inference
using only NumPy. No TensorFlow dependency required.

Model Architecture (from fashion_classifier.keras):
    Input:              (batch, 224, 224, 3)
    Conv2D(16, 3×3)  +  ReLU  →  (batch, 222, 222, 16)
    MaxPool2D(2×2)              →  (batch, 111, 111, 16)
    Conv2D(32, 3×3)  +  ReLU  →  (batch, 109, 109, 32)
    MaxPool2D(2×2)              →  (batch,  54,  54, 32)
    Conv2D(64, 3×3)  +  ReLU  →  (batch,  52,  52, 64)
    MaxPool2D(2×2)              →  (batch,  26,  26, 64)
    GlobalAvgPool2D             →  (batch, 64)
    Dense(64) + ReLU            →  (batch, 64)
    Dropout(0.3)   [skipped]
    Dense(4) + Softmax          →  (batch, 4)
"""

import os
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Class mapping for the fashion classifier
CLASS_MAPPING = {
    0: "Casual",
    1: "Ethnic",
    2: "Formal",
    3: "Sports"
}

# Global weights reference
_weights = None
_model_loaded = False


# ────────────────────────────────────────────────────────────────
#  NumPy Layer Operations
# ────────────────────────────────────────────────────────────────

def _conv2d(x, kernel, bias):
    """
    2D convolution (valid padding, stride 1, channels_last).

    Args:
        x:      (batch, H, W, C_in)
        kernel: (kH, kW, C_in, C_out)
        bias:   (C_out,)

    Returns:
        (batch, H - kH + 1, W - kW + 1, C_out)
    """
    batch, h, w, c_in = x.shape
    kh, kw, _, c_out = kernel.shape
    out_h = h - kh + 1
    out_w = w - kw + 1

    # Use im2col approach for efficiency
    # Build column matrix of all patches
    cols = np.zeros((batch, out_h, out_w, kh, kw, c_in), dtype=x.dtype)
    for i in range(kh):
        for j in range(kw):
            cols[:, :, :, i, j, :] = x[:, i:i + out_h, j:j + out_w, :]

    # Reshape for matrix multiplication
    # cols: (batch, out_h, out_w, kh * kw * c_in)
    cols = cols.reshape(batch, out_h, out_w, -1)
    # kernel: (kh * kw * c_in, c_out)
    k = kernel.reshape(-1, c_out)

    # Perform convolution via matrix multiply + bias
    output = cols @ k + bias

    return output


def _relu(x):
    """ReLU activation: max(0, x)."""
    return np.maximum(0, x)


def _max_pool2d(x, pool_size=2, stride=2):
    """
    2D max pooling (valid padding).

    Args:
        x: (batch, H, W, C)

    Returns:
        (batch, H // stride, W // stride, C)
    """
    batch, h, w, c = x.shape
    out_h = h // stride
    out_w = w // stride

    # Reshape and take max over pool windows
    x_trimmed = x[:, :out_h * stride, :out_w * stride, :]
    x_reshaped = x_trimmed.reshape(batch, out_h, stride, out_w, stride, c)
    return x_reshaped.max(axis=(2, 4))


def _global_avg_pool2d(x):
    """
    Global average pooling over spatial dimensions.

    Args:
        x: (batch, H, W, C)

    Returns:
        (batch, C)
    """
    return x.mean(axis=(1, 2))


def _dense(x, kernel, bias):
    """
    Dense (fully connected) layer.

    Args:
        x:      (batch, in_features)
        kernel: (in_features, out_features)
        bias:   (out_features,)

    Returns:
        (batch, out_features)
    """
    return x @ kernel + bias


def _softmax(x):
    """
    Softmax activation (numerically stable).

    Args:
        x: (batch, C)

    Returns:
        (batch, C) with values summing to 1 along last axis.
    """
    exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)


# ────────────────────────────────────────────────────────────────
#  Model Loading & Prediction
# ────────────────────────────────────────────────────────────────

def load_model():
    """
    Load the pre-trained fashion classifier weights from disk.

    Looks for fashion_classifier_weights.npz first (pre-extracted NumPy weights).
    If not found, attempts to extract from fashion_classifier.keras on-the-fly.

    Returns:
        True if weights loaded successfully.

    Raises:
        FileNotFoundError: If no model/weights files exist.
        Exception: If loading fails.
    """
    global _weights, _model_loaded

    if _model_loaded:
        logger.info("Model already loaded, returning cached weights.")
        return True

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    npz_path = os.path.join(base_dir, 'fashion_classifier_weights.npz')
    keras_path = os.path.join(base_dir, 'fashion_classifier.keras')

    # Strategy 1: Load pre-extracted .npz weights
    if os.path.exists(npz_path):
        try:
            _weights = dict(np.load(npz_path))
            _model_loaded = True
            logger.info(f"Loaded weights from: {npz_path}")
            _log_weight_shapes()
            return True
        except Exception as e:
            logger.warning(f"Failed to load .npz weights: {e}")

    # Strategy 2: Extract from .keras file on-the-fly
    if os.path.exists(keras_path):
        try:
            _weights = _extract_weights_from_keras(keras_path)
            _model_loaded = True
            logger.info(f"Extracted weights from: {keras_path}")

            # Save for faster loading next time
            try:
                np.savez(npz_path, **_weights)
                logger.info(f"Cached weights to: {npz_path}")
            except Exception as e:
                logger.warning(f"Could not cache weights: {e}")

            _log_weight_shapes()
            return True
        except Exception as e:
            logger.error(f"Failed to extract weights from .keras: {e}")
            raise

    raise FileNotFoundError(
        f"No model files found. Place 'fashion_classifier.keras' in the backend/ "
        f"directory, then run: python extract_weights.py"
    )


def _extract_weights_from_keras(keras_path):
    """
    Extract weights directly from a .keras file (zip containing model.weights.h5).

    Requires h5py to be installed. This is used as a fallback when
    fashion_classifier_weights.npz doesn't exist yet.
    """
    import zipfile
    import tempfile

    try:
        import h5py
    except ImportError:
        raise ImportError(
            "h5py is required to extract weights from .keras files. "
            "Install it with: pip install h5py\n"
            "Alternatively, run 'python extract_weights.py' on a system with h5py."
        )

    with zipfile.ZipFile(keras_path, 'r') as z:
        h5_data = z.read('model.weights.h5')

    with tempfile.NamedTemporaryFile(suffix='.h5', delete=False) as tmp:
        tmp.write(h5_data)
        tmp_path = tmp.name

    try:
        weights = {}
        layer_names = ['conv2d', 'conv2d_1', 'conv2d_2', 'dense', 'dense_1']

        with h5py.File(tmp_path, 'r') as f:
            for layer_name in layer_names:
                for prefix in [f'layers/{layer_name}/vars', f'{layer_name}/vars']:
                    try:
                        group = f[prefix]
                        if '0' in group:
                            weights[f'{layer_name}_kernel'] = np.array(group['0'])
                            weights[f'{layer_name}_bias'] = np.array(group['1'])
                            break
                    except (KeyError, ValueError):
                        continue

        if len(weights) < 10:
            raise ValueError(f"Expected 10 weight arrays, found {len(weights)}")

        return weights

    finally:
        os.unlink(tmp_path)


def _log_weight_shapes():
    """Log the shapes of loaded weights for verification."""
    if _weights:
        for key, val in _weights.items():
            logger.info(f"  {key}: {val.shape}")


def predict(preprocessed_image):
    """
    Run prediction on a preprocessed image using pure NumPy forward pass.

    Args:
        preprocessed_image (numpy.ndarray): Preprocessed image array
            with shape (1, 224, 224, 3), normalized to [0, 1].

    Returns:
        dict: {
            "prediction": str (e.g., "Formal"),
            "confidence": float (e.g., 94.3),
            "all_predictions": dict (e.g., {"Casual": 2.1, "Ethnic": 1.5, ...})
        }

    Raises:
        RuntimeError: If the model is not loaded.
        Exception: If prediction fails.
    """
    global _weights

    if not _model_loaded or _weights is None:
        raise RuntimeError("Model is not loaded. Call load_model() first.")

    try:
        x = preprocessed_image.astype(np.float32)

        # ── Forward pass through the CNN ──────────────────────

        # Conv2D(16) + ReLU → (1, 222, 222, 16)
        x = _conv2d(x, _weights['conv2d_kernel'], _weights['conv2d_bias'])
        x = _relu(x)

        # MaxPool2D → (1, 111, 111, 16)
        x = _max_pool2d(x)

        # Conv2D(32) + ReLU → (1, 109, 109, 32)
        x = _conv2d(x, _weights['conv2d_1_kernel'], _weights['conv2d_1_bias'])
        x = _relu(x)

        # MaxPool2D → (1, 54, 54, 32)
        x = _max_pool2d(x)

        # Conv2D(64) + ReLU → (1, 52, 52, 64)
        x = _conv2d(x, _weights['conv2d_2_kernel'], _weights['conv2d_2_bias'])
        x = _relu(x)

        # MaxPool2D → (1, 26, 26, 64)
        x = _max_pool2d(x)

        # GlobalAveragePooling2D → (1, 64)
        x = _global_avg_pool2d(x)

        # Dense(64) + ReLU → (1, 64)
        x = _dense(x, _weights['dense_kernel'], _weights['dense_bias'])
        x = _relu(x)

        # Dropout is skipped during inference

        # Dense(4) + Softmax → (1, 4)
        x = _dense(x, _weights['dense_1_kernel'], _weights['dense_1_bias'])
        predictions = _softmax(x)

        # ── Parse results ─────────────────────────────────────
        predicted_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_index]) * 100

        all_predictions = {}
        for idx, class_name in CLASS_MAPPING.items():
            all_predictions[class_name] = round(float(predictions[0][idx]) * 100, 1)

        predicted_style = CLASS_MAPPING[predicted_index]

        logger.info(f"Prediction: {predicted_style} ({confidence:.1f}%)")

        return {
            "prediction": predicted_style,
            "confidence": round(confidence, 1),
            "all_predictions": all_predictions
        }

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise
