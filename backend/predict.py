import json
import sys
from ml_service import predict

payload = json.load(sys.stdin)
result = predict(payload)
print(json.dumps(result))
