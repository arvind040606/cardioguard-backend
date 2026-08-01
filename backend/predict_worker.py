import json
import sys
from ml_service import predict

# Persistent interactive loop for instant evaluation without reloading models/libraries
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        payload = json.loads(line)
        result = predict(payload)
        print(json.dumps(result))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()
