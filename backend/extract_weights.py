"""
One-time script to extract model weights from the .keras file
and save them as a NumPy .npz file for TF-free inference.

Usage:
    python extract_weights.py

This reads fashion_classifier.keras (a zip containing model.weights.h5)
and outputs fashion_classifier_weights.npz.

Requires h5py to be installed:
    pip install h5py
"""

import zipfile
import tempfile
import os
import sys
import numpy as np


def extract_weights():
    keras_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fashion_classifier.keras')
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fashion_classifier_weights.npz')

    if not os.path.exists(keras_path):
        print(f"ERROR: {keras_path} not found!")
        return False

    try:
        import h5py
    except ImportError:
        print("ERROR: h5py is not installed. Run: pip install h5py")
        print("If h5py doesn't support your Python version, see README for alternatives.")
        return False

    # Extract the .h5 weights file from the .keras zip
    with zipfile.ZipFile(keras_path, 'r') as z:
        h5_data = z.read('model.weights.h5')

    # Write to a temp file so h5py can read it
    with tempfile.NamedTemporaryFile(suffix='.h5', delete=False) as tmp:
        tmp.write(h5_data)
        tmp_path = tmp.name

    try:
        weights = {}

        with h5py.File(tmp_path, 'r') as f:
            print("=== H5 File Structure ===")
            def print_structure(name, obj):
                if isinstance(obj, h5py.Dataset):
                    print(f"  {name}: shape={obj.shape}, dtype={obj.dtype}")
            f.visititems(print_structure)
            print()

            layer_names = [
                'conv2d',       # Conv2D: kernel (3,3,3,16), bias (16,)
                'conv2d_1',     # Conv2D: kernel (3,3,16,32), bias (32,)
                'conv2d_2',     # Conv2D: kernel (3,3,32,64), bias (64,)
                'dense',        # Dense: kernel (64,64), bias (64,)
                'dense_1',      # Dense: kernel (64,4), bias (4,)
            ]

            for layer_name in layer_names:
                found = False

                # Try Keras 3 format: layers/<name>/vars/0 and vars/1
                for prefix in [f'layers/{layer_name}/vars', f'{layer_name}/vars', f'layers/{layer_name}']:
                    try:
                        group = f[prefix]
                        if '0' in group:
                            kernel = np.array(group['0'])
                            bias = np.array(group['1'])
                            weights[f'{layer_name}_kernel'] = kernel
                            weights[f'{layer_name}_bias'] = bias
                            print(f"  ✅ {layer_name}: kernel={kernel.shape}, bias={bias.shape}")
                            found = True
                            break
                    except (KeyError, ValueError):
                        continue

                if not found:
                    # Try TF/Keras 2 flat structure
                    try:
                        kernel = np.array(f[f'{layer_name}/kernel:0'])
                        bias = np.array(f[f'{layer_name}/bias:0'])
                        weights[f'{layer_name}_kernel'] = kernel
                        weights[f'{layer_name}_bias'] = bias
                        print(f"  ✅ {layer_name}: kernel={kernel.shape}, bias={bias.shape}")
                        found = True
                    except (KeyError, ValueError):
                        pass

                if not found:
                    print(f"  ❌ {layer_name}: NOT FOUND")

        # Save all weights as a single .npz file
        np.savez(output_path, **weights)
        print(f"\n✅ Weights saved to: {output_path}")
        print(f"   Keys: {list(weights.keys())}")
        return True

    finally:
        os.unlink(tmp_path)


if __name__ == '__main__':
    success = extract_weights()
    sys.exit(0 if success else 1)
