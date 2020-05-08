from flask import Flask,redirect,url_for,render_template,request
import json,csv
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
CORS(app)


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
    """ this is the main api getting data from the react form and sending data back to react in json format """

    ''' below parameters will be used in sql query to filter data coming from the process_table in db'''
    if request.method == 'POST':
        respone = request.json                   # getting the form data sent by form on the react front end
        application = respone.get('application')
        dataset = respone.get('dataset')
        fromdate = respone.get('fromDate')
        todate = respone.get('toDate')
        print(application)
        print(dataset)

    csvfile = open('data.csv', 'r')
    fieldnames = ('date','datasetname','source_filename',
                  'userid','application','process_id',
                  'step','record_count','status','message')

    reader = csv.DictReader( csvfile, fieldnames)
    dashboard_data = []
    for row in reader:
        dashboard_data.append(row)
    application_list = ['Transformation','Stage load'] # this list will be created from a table column in db
    dataset_list = ['DTST_1','DTST_2','DTST_3','DTST_4','DTST_5']  # this list will be created from a table column in db
    drop_down_data = {'application_list': application_list,'dataset_list': dataset_list}

    full_data={'dropdown_data':drop_down_data,'dashboard_data':dashboard_data} # this has to be changed later

    return (full_data)


if __name__=='__main__':
    app.run(host='localhost',debug=True)
