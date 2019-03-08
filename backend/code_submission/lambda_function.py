import json
import os
from subprocess import Popen, PIPE

def lambda_handler(event, context):
    # TODO(awogbemila) If "code" is not available in event object, this is an
    # error and should be handled.
    code_str = event["code"]
    
    target_file_path_str = "/tmp/submission.py"
    with open(target_file_path_str, "w+") as target_file:
        target_file.write(code_str)
        
    p = Popen(["python3", "-u", target_file_path_str], stdin=PIPE, stdout=PIPE, stderr=PIPE)

    return_code = p.wait()

    res, err = "", ""
    error_status = False

    # Get all standard output.
    for line in p.stdout:
        res += line.decode("utf-8")
        
    # Flag and note errors if available.
    for line in p.stderr:
        error_status = True
        err += line.decode("utf-8")

    return {
        'statusCode': 200,
        'body': json.dumps({'ret-code': return_code,
                            'res': res,
                            'err': err,
                            'error-status': error_status
        }),
    }
