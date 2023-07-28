from flask import Flask
from flask import render_template
from flask import Response


app = Flask(__name__)


def generate():
    while True:
        (flag, encodedImage) = cv2.imencode(".jpg", vs.read())
        if not flag:
            continue
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/video_feed")
def video_feed():
    return Response(generate(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")


if __name__ == "__main__":
    app.run(debug=True)
