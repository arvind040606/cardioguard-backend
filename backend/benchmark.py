import json
from benchmark_service import get_benchmark_analytics

if __name__ == '__main__':
    try:
        result = get_benchmark_analytics()
        print(json.dumps(result))
    except Exception as e:
        import sys
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
