import json
import os

import sys
sys.path.append("/tmp")

from subprocess import Popen, PIPE

def lambda_handler(event, context):
    code_str = event["code"]
    test_str = event["test"]
    
    target_file_path_str = "/tmp/submission.py"
    test_file_path_str = "/tmp/test.py"
    
    with open(target_file_path_str, "w+") as target_file:
        target_file.write(code_str)
    
    with open(test_file_path_str, "w+") as test_file:
        test_file.write(test_str)
    
        
    p = Popen(["python3", "-u", test_file_path_str], stdin=PIPE, stdout=PIPE, stderr=PIPE)

    return_code = p.wait()

    result, errors = "", ""
    error_status = False

    # Get all standard output.
    for line in p.stdout:
        result += line.decode("utf-8")
        
    # Flag and note errors if available.
    for line in p.stderr:
        error_status = True
        errors += line.decode("utf-8")

    return {
        'statusCode': 200,
        'body': json.dumps({'returncode': return_code,
                            'result': result,
                            'error': errors,
                            'error-status': error_status
        }),
    }
