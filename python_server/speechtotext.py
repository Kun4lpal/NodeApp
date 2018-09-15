#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import os
import speech_recognition as sr
from tqdm import tqdm

with open("api-key.json") as f:
    GOOGLE_CLOUD_SPEECH_CREDENTIALS = f.read()

r = sr.Recognizer()
files = os.listdir('parts/')

all_text = []

for f in tqdm(files):
    name = "parts/" + f
    # Load audio file
    with sr.AudioFile(name) as source:
        audio = r.record(source)
    # Transcribe audio file
    text = r.recognize_google_cloud(audio, credentials_json=GOOGLE_CLOUD_SPEECH_CREDENTIALS)
    all_text.append(text)

transcript = ""
for i, t in enumerate(all_text):
    total_seconds = i * 30
    # Cool shortcut from:
    # https://stackoverflow.com/questions/775049/python-time-seconds-to-hms
    # to get hours, minutes and seconds
    m, s = divmod(total_seconds, 60)
    h, m = divmod(m, 60)

    # Format time as h:m:s - 30 seconds of text
    transcript = transcript + "{:0>2d}:{:0>2d}:{:0>2d} {}\n".format(h, m, s, t)

print(transcript)

with open("transcript.txt", "w") as f:
    f.write(transcript)

    
    # Flag to check detection
    # detected = True

    # # The name of the audio file to transcribe
    # file_name = os.path.join(
    #     os.path.dirname(__file__),
    #     'RecordedFile.wav')

    # # Loads the audio into memory
    # with io.open(file_name, 'rb') as audio_file:
    #     content = audio_file.read()
    #     sample = speech_client.sample(
    #         content,
    #         source_uri=None,
    #         encoding='LINEAR16')

    # # Detects speech in the audio file
    # try:
    #     alternatives = sample.recognize('ko-KR')
    #     # alternatives = sample.recognize('en-US')
    # except ValueError:
    #     detected = False

    # outFile = open('result.txt', 'w')
    # if detected:
    #     for alternative in alternatives:
    #         outFile.write(alternative.transcript)
    # else:
    #     outFile.write('No Voice Detected.')

    # outFile.close()

    # [END speech_quickstart]


# if __name__ == '__main__':
#     speech_recog()
