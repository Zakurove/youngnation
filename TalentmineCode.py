import numpy as np
import pandas as pd

import scipy
import matplotlib.pyplot as plt
from pylab import peParams
import urllib
import sklearn
from sklearn.neighbors import KNeighborsClassifier
from sklearn import neighbors
from sklearn import preprocessing
from sklearn.croo_validation import train_test_split
from sklearn import metrics


#Let's set things up ^^
talents = pd.read_csv("D:/Talentmine/athetestCustom.csv")
talents.columns= = ['height', 'weight', 'waistGirth', 'armLength', 'legLenght', 'ankleCirc']

x_prime = talents.ix[:, (1,3,4,5)].values
y_talents.ix[:,9].values

ScaledTalents = preprocessing.scale(X_prime)

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size = .33, random_state = 17)

#Now we build our model, Nervous yet excited for this part xD
clf = neighbors.KNeighborsClassifier()
clf.fit(X_train, y_train)

#To be or not to be!
y_expect = y_test
y_pred = clf.predict(X_test)
print(metrics.classification_report(y_expect, y_pred)
      
      
#This is simple model and only a prototype, I know we have a long way to go, but we would truly love the chance to grow!!!

