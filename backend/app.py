from flask import Flask,redirect,url_for,render_template

app=Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('home'))
@app.route('/home')
def home():
    return render_template('home.html')
@app.route('/login')
def login():
    return render_template('login.html')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__=='__main__':
    app.run(host='localhost',debug=True)
