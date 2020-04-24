from flask import Flask

app=Flask(__name__)

@app.route('/')
def index():
    return 'index page'
@app.route('/home')
def home():
    return 'Home page'
@app.route('/login')
def login():
    return 'login page'
@app.route('/dashboard')
def dashboard():
    return 'dashboard page'


if __name__=='__main__':
    app.run(host='localhost',debug=True)
