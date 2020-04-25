from flask import Flask,redirect,url_for,render_template
import json,csv
from flask import jsonify

app=Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('home'))
@app.route('/home')
def home():
    return render_template('home.html')
@app.route('/login',methods=['GET', 'POST'])
def login():
    return render_template('login.html')
@app.route('/dashboard',methods=['GET','POST'])
def dashboard():

    csvfile = open('data.csv', 'r')
    fieldnames = ('date','datasetname','source_filename','correlation_id',
                  'application','local_execution_id','tracking_step','record_count','status','message')
    reader = csv.DictReader( csvfile, fieldnames)
    dashboard_data=[]
    for  row in reader:
        dashboard_data.append(row)
    return jsonify(dashboard_data)


if __name__=='__main__':
    app.run(host='localhost',debug=True)
