from importlib.resources import path
from operator import truediv
from flask import Flask, request, jsonify, flash, redirect, url_for, render_template
import cv2
import numpy as np
import os



app = Flask(__name__)


@app.route('/api/hello')
def hello():
    return {
        "message": "Hello World!",
        "title": "Merhaba Sayfası"
    }

app.config['UPLOAD_FOLDER'] = '../public/images'


def rtrner():
    if os.listdir(path):
        for filename in os.listdir(path):
            testImage = cv2.imread('../public/Images/' + filename)
            sobel_edge_detector(testImage, filename)
            laplacian_edge_detector(testImage, filename)



@app.route('/api/upload', methods=['POST'])
def upload():
    
   if request.method == 'POST':
        f = request.files['file']
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
        print(f.filename)
        rtrner()
        return jsonify({"message": "File uploaded successfully", "filename": f.filename})
    

pathSobel = '../public/Sobel'

pathLaplacian = '../public/Laplacian'

path = '../public/Images'

def sobel_edge_detector(img, imgName):
    grad_x = cv2.Sobel(img, cv2.CV_64F, 1, 0)
    grad_y = cv2.Sobel(img, cv2.CV_64F, 0, 1)
    grad = np.sqrt(grad_x**2 + grad_y**2)
    grad_norm = (grad * 255 / grad.max()).astype(np.uint8)

    cv2.imwrite(os.path.join(pathSobel , imgName), grad_norm)


def laplacian_edge_detector(img, imgName):
    laplacian = cv2.Laplacian(img, cv2.CV_64F)
    laplacian_norm = (laplacian * 255 / laplacian.max()).astype(np.uint8)

    cv2.imwrite(os.path.join(pathLaplacian , imgName), laplacian_norm)




@app.route('/api/images')
def images():
    images = []
    Sobel = []
    Laplacian = []

    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        images.append(filename)
    
    for filename in os.listdir(pathSobel):
        Sobel.append(filename)
        
    for filename in os.listdir(pathLaplacian):
        Laplacian.append(filename)
    

    return jsonify({"images": images, "sobel": Sobel, "laplacian": Laplacian})


