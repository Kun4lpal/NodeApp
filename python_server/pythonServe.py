# from service import root_dir, nice_json
from flask import Flask, request, send_from_directory, render_template
import json
import os
from flask import jsonify
from flask import render_template
from flask import flash
from flask import current_app
from flask import make_response
from flask import abort
from flask import request
from multiprocessing.dummy import Pool
import soundfile as sf
import subprocess
pool = Pool(8) # Number of concurrent threads
# from fast2 import transcribe
import argparse
import io

# this sets up the server
app = Flask(__name__,static_url_path='')
PATH =  os.path.dirname(os.path.realpath(__file__))
#load a json file
# with open("{}/database/techEvents.json".format(root_dir()), "r") as f:
#     techEvents = json.load(f)

#handle a get request

@app.route("/", methods=['GET'])
def mainss():
    return 'Todo...'

@app.route("/ss", methods=['GET'])
def hello():
    resp = make_response(render_template('index.html', selected_menu_item="index"))
    resp.set_cookie('myCookie','this is a custom cookie sent from the server')
    return resp
    # file = os.path.abspath('index.html')    
    # return app.send_static_file(file)
    # return 'ss'


@app.route("/audio", methods=['POST'])
def audioHandler():    
    file = request.files.get('file')
    file.save('RecordedFile.ogg')
    subprocess.run('ffmpeg -i RecordedFile.ogg parts/output.wav', shell=True)
    speech_to_text()
    dirPath = PATH + "\\parts"
    fileList = os.listdir(dirPath)
    for fileName in fileList:
    	print('removing: ',fileName)
    	os.remove(dirPath+"/"+fileName)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json', 'Access-Control-Allow-Origin' : '*'} 

def speech_to_text():
    subprocess.run('python speechtotext.py', shell=True)
    inFile = open('transcript.txt', 'r')
    transcript = ''
    for line in inFile:
        transcript += line
    print(transcript)
    return transcript


@app.route("/test", methods=['GET'])
def test_func():
	return json.dumps({'success':True}), 200, {'ContentType':'application/json', 'Access-Control-Allow-Origin' : '*'} 
    # return 200, {'ContentType':'application/json', 'Access-Control-Allow-Origin' : '*'} 


#handler a get request
@app.route("/techEvents", methods=['GET'])
def event_list():
    map_data = {}
    map_data['demo'] = ['testing']
    return map_data


@app.route("/techEvents/<username>", methods=['GET'])
def event_record(username):
    if username not in techEvents:
        raise NotFound
    return nice_json(techEvents[username])




if __name__ == "__main__":
    app.run(port=5003, debug=True)