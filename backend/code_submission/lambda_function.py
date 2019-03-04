import json
import os
from subprocess import Popen, PIPE

def lambda_handler(event, context):
    code_str = event["code"]
    
    target_file_path_str = "/tmp/submission.py"
    with open(target_file_path_str, "w+") as target_file:
        target_file.write(code_str)
        
    p = Popen(["python3", "-u", target_file_path_str], stdin=PIPE, stdout=PIPE, stderr=PIPE)

    res =""
    for line in p.stdout:
        res += line.decode("utf-8")

    return {
        'statusCode': 200,
        'body': json.dumps({'res': res}),
        'event-info': event
    }
