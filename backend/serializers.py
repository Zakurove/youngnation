from rest_framework import serializers
from .models import Session
import logging
import json
import sys
import re
import random
import pickle
import sklearn 
import pandas as pd
import numpy as np

#The Analysis Session
class SessionSerializer(serializers.ModelSerializer):
    
    class Meta:
        ordering = ['-id']
        model = Session
        fields = ('id', 'age', 'height', 'weight', 'armL', 'legL',  'chestG', 'date','owner_username', 'owner', 'sport')
        
    def create(self, validated_data):
        #Session
        creator = self.context['request'].user
        height=validated_data.get('height', 'no-height')
        age=validated_data.get('age', 'no-age')
        legL=validated_data.get('legL', 'no-legL')
        chestG=validated_data.get('chestG', 'no-chestG')
        weight=validated_data.get('weight', 'no-weight')
        armL=validated_data.get('armL', 'no-armL')
        #Where the magic happens!
        filename = 'SVM82Model.sav'
        example = [height,  weight,  armL,  legL,  chestG ]
        exampleNP = np.array(example)
        input = np.reshape(exampleNP, (-1,5))
        loaded_model = pickle.load(open(filename, 'rb'))
        prediction = loaded_model.predict(input)
        sportPredicted = "DragonRiding"
        predictionNum = prediction.item()
        print(predictionNum)
        if prediction == 0:
            sportPredicted = "basketball"
        if prediction == 1:
            sportPredicted = "fencing"
        if prediction == 2:
            sportPredicted = "judo"
        if prediction == 3:
            sportPredicted = "swimming"                                
        if prediction == 4:
            sportPredicted = "tennis"
        if prediction == 5:
            sportPredicted = "volleyball"            
        #After the magic finishes, we assign the sport and and create the new session along with its data
        session = Session.objects.create(sport = sportPredicted,age=validated_data.get('age', 'no-age'), height=validated_data.get('height', 'no-height'),legL=validated_data.get('legL', 'no-legL'),chestG=validated_data.get('chestG', 'no-chestG'),weight=validated_data.get('weight', 'no-weight'), armL=validated_data.get('armL', 'no-armL'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )

        #RETURN
        return set















