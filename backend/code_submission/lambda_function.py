import json
import os
import subprocess

def lambda_handler(event, context):
    dir_list = os.listdir("./")
    dir_list_str = "".join(dir_list)
    
    target_file_path_str = "/tmp/target.py"
    with open(target_file_path_str, "w+") as target_file:
        with open("source.py") as source_file:
            for line in source_file:
                target_file.write(line)
                
        res = subprocess.Popen(["python3", target_file_path_str])
        res = res.communicate()
    
    return {
        'statusCode': 200,
        'body': json.dumps({'data': 'Hello from Lambda!' + dir_list_str, 'message':'CORS enabled', 'res': res})
    }
