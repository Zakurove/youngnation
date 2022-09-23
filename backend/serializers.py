from rest_framework import serializers
from .models import Session, Set, SetImage, SetNotes, SetFeature, Cluster, PracticeDescInput, PracticeDescSession, EmailList, PracticeIdentifySession
import logging
import json
import sys
import re
import random

#The Analysis Session
class SessionSerializer(serializers.ModelSerializer):
    
    class Meta:
        ordering = ['-id']
        model = Session
        fields = ('id', 'age', 'height', 'weight', 'armL', 'legL',  'chestG', 'date','owner_username', 'owner', 'sport')
        
    def create(self, validated_data):
        #Session
        creator = self.context['request'].user
        #Where the magic happens!





        #After the magic finishes, we assign the sport and and create the new session along with its data
        session = Session.objects.create(sport = "DragonRiding",age=validated_data.get('age', 'no-age'), height=validated_data.get('height', 'no-height'),legL=validated_data.get('legL', 'no-legL'),chestG=validated_data.get('chestG', 'no-chestG'),weight=validated_data.get('weight', 'no-weight'), armL=validated_data.get('armL', 'no-armL'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )

        #RETURN
        return set















#PracticeIdentifySession
class PracticeIdentifySessionSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = PracticeIdentifySession
        fields = ('id', 'date','block', 'owner_username', 'owner', 'result', 'questions', 'practiceType', 'images' )
        extra_kwargs = {'images': {'required': False}}
        # extra_kwargs = {'practiceDescInputs': {'required': False}}
  
    def create(self, validated_data):
        creator = self.context['request'].user
       
        #Get the sets from frotnend
        selectedSetsUnshuffled= json.loads(self.context.get('view').request.data.get('selectedSets'))
        selectedSets = random.sample(selectedSetsUnshuffled, len(selectedSetsUnshuffled))
        blockSets = json.loads(self.context.get('view').request.data.get('blockSets'))
        questionsArray = []
        sessionImages = []
        index = 0
        numOfIndex = len(blockSets)-1
        #Iterate through the selected sets and create a question from each
        for set in selectedSets:
            images = set["images"]
            numImages = len(images)-1
            chosenImage = images[random.randint(0, numImages)]
            image = chosenImage["image"]
            #Get 3 random numbers, in the range of number of index in the block, it must not be equal to the index of our set
            K = set
            randomSets = random.sample(list(filter(lambda ele: ele["id"] != K["id"], blockSets)),3)
            text1= randomSets[0]
            text2=randomSets[1]
            text3=randomSets[2]
            index = index+1
            #Choose options based on the random
            options = [{'text': set["title"], 'isCorrect': 'true', 'id': int(set["id"])*11}, {'text': text1["title"], 'isCorrect': 'false', 'id': int(set["id"])*8}, {'text': text2["title"], 'isCorrect': 'false', 'id': int(set["id"])*33}, {'text': text3["title"], 'isCorrect': 'false', 'id': int(set["id"])*14}]
            
            #Add a many to many relationship with the images
            sessionImages.append(chosenImage['id'])

            #Create the quetion based on the above
            question = {'options': options, 'index': index, 'imageId':chosenImage['id']}
            questionsArray.append(question)
        practiceIdentifySession = PracticeIdentifySession.objects.create(block=self.context.get('view').request.data.get('block'), practiceType = 'Identification', questions=questionsArray, owner= self.context['request'].user, owner_username= self.context['request'].user.name )
        practiceIdentifySession.images.set(sessionImages)
        #RETURN
        return practiceIdentifySession

    def update(self, instance, validated_data):
        #Practice Identification Session  
        results= json.loads(self.context.get('view').request.data.get('results'))
        #Calculating The Accuracy of the session
        counter = 0
        for question in results:
            if question['isCorrect'] == 'true':
                counter += 1
        print(counter, "counter!!!")
        percentageCorrect = counter/len(results)
        results = {'answeredQuestions': results, 'accuracy': percentageCorrect*100}
        # Saving and returning
        instance.result = results
        instance.save()
        return instance


#PracticeDescSession
class PracticeDescSessionSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = PracticeDescSession
        fields = ('id', 'date','block', 'owner_username', 'owner', 'sets', 'practiceDescInputs', 'practiceType' )
        extra_kwargs = {'sets': {'required': False}}
        extra_kwargs = {'practiceDescInputs': {'required': False}}
  
    def create(self, validated_data):
        #PracticeDescInput
        creator = self.context['request'].user
        practiceDescSession = PracticeDescSession.objects.create(block=self.context.get('view').request.data.get('block'), practiceType = 'Description',owner= self.context['request'].user, owner_username= self.context['request'].user.name )
        #Get the sets array from frotnend
        setsArray =self.context.get('view').request.data.get('setsArray')
        #To split set ids
        setsArray = setsArray.split(',')
        practiceDescSession.sets.set(setsArray)
        # #Get the inputs array from frotnend
        # inputsArray =self.context.get('view').request.data.get('inputsArray')
        # #To split input ids
        # inputsArray = inputsArray.split(',')
        # practiceDescSession.practiceDescInputs.set(inputsArray)
        #RETURN
        return practiceDescSession

    # def update(self, instance, validated_data):
    #     #CLUSTER
    #     cluster = instance
    #     instance.title = validated_data['title']
    #     instance.description = validated_data['description']
    #     setsArray =self.context.get('view').request.data.get('setsArray')
    #     setsArray = setsArray.split(',')
    #     print(setsArray)

    #     instance.sets.set(setsArray)

    #     #Saving and returning

    #     instance.save()
    #     return instance


#EmailList
class EmailListSerializer(serializers.ModelSerializer):
    class Meta:
        ordering = ['-id']
        model = EmailList
        fields = ('id', 'email','currentBlock')

    def create(self, validated_data):
        #EmailList
        emailList = EmailList.objects.create(email=validated_data.get('email', 'no-email'),currentBlock=validated_data.get('currentBlock', 'no-block'))
        #RETURN
        return emailList



#PracticeDescInput
class PracticeDescInputSerializer(serializers.ModelSerializer):
    practiceDescSessions = PracticeDescSessionSerializer ( read_only=True, many=True)
    class Meta:
        ordering = ['-id']
        model = PracticeDescInput
        fields = ('id', 'description','block', 'owner_username', 'owner', 'sets', 'practiceDescSessions' )
        extra_kwargs = {'sets': {'required': False}}
        extra_kwargs = {'practiceDescSessions': {'required': False}}
  
    def create(self, validated_data):
        #PracticeDescInput
        creator = self.context['request'].user
        practiceDescInput = PracticeDescInput.objects.create(description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )

        setID =self.context.get('view').request.data.get('setId')
        setID = setID.split(',')

        practiceDescInput.sets.set(setID)

        sessionID =self.context.get('view').request.data.get('sessionId')
        sessionID = sessionID.split(',')
        practiceDescInput.practiceDescSessions.set(sessionID)
        #RETURN
        return practiceDescInput

    # def update(self, instance, validated_data):
    #     #CLUSTER
    #     cluster = instance
    #     instance.title = validated_data['title']
    #     instance.description = validated_data['description']
    #     setsArray =self.context.get('view').request.data.get('setsArray')
    #     setsArray = setsArray.split(',')
    #     print(setsArray)

    #     instance.sets.set(setsArray)

    #     #Saving and returning

    #     instance.save()
    #     return instance



#Cluster
class ClusterSerializer(serializers.ModelSerializer):
    #Many to many relationship between sets and clusters
    # sets = SetSerializer(many=True, read_only=True)
    class Meta:
        ordering = ['-id']
        model = Cluster
        fields = ('id', 'title', 'description','block', 'subject', 'owner_username', 'owner', 'sets')
        extra_kwargs = {'sets': {'required': False}}
  
    def create(self, validated_data):
        #Cluster
        creator = self.context['request'].user
        cluster = Cluster.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'),subject=self.context.get('view').request.data.get('subject'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )
        #Get the sets array from fronend
        setsArray =self.context.get('view').request.data.get('setsArray')
        #To split set ids
        setsArray = setsArray.split(',')
        cluster.sets.set(setsArray)
        #Adding the sets one by one, bun intended (One is the name of my cat)
        # for set in setsArray:
        #     cluster.sets.add(set)
        #RETURN
        return cluster

    def update(self, instance, validated_data):
        #CLUSTER
        cluster = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']
        setsArray =self.context.get('view').request.data.get('setsArray')
        setsArray = setsArray.split(',')
        print(setsArray)

        instance.sets.set(setsArray)

        #Saving and returning

        instance.save()
        return instance



#---Set Items:
#Set Notes
class SetNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetNotes
        fields = ('id','noteContent','x','y')

#Set Images
class SetImageSerializer(serializers.ModelSerializer):
    notes = SetNotesSerializer(source='setNotes', many=True, read_only=True)

    class Meta:
        model = SetImage
        fields = ('id','image','notes')

#Set Images
class SetFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetImage
        fields = ('id','title','description')
#The Set
class SetSerializer(serializers.ModelSerializer):

    features = SetFeatureSerializer(source='setFeatures', many=True, read_only=True)
    images = SetImageSerializer(source='setImages', many=True, read_only=True)
    clusters = ClusterSerializer ( read_only=True, many=True)
    
    class Meta:
        ordering = ['-id']
        model = Set
        fields = ('id', 'title', 'description', 'highYield', 'features', 'references',  'images', 'block', 'subject', 'owner_username', 'owner', 'clusters')
        extra_kwargs = {'clusters': {'required': False}}
        
    def create(self, validated_data):
        #SET
        creator = self.context['request'].user
        set = Set.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'), highYield=validated_data.get('highYield', 'no-highYield'), references=validated_data.get('references', 'no-references'), block=self.context.get('view').request.data.get('block'),subject=self.context.get('view').request.data.get('subject'), owner= self.context['request'].user, owner_username= self.context['request'].user.name )

        #Here create features for this set
        #Maybe recieve a list of features, each features has a title and a description then do a forEach to create each one of them.

        #IMAGES
        images_data = self.context.get('view').request.FILES     
        #Three is the genius cat that cracked the code (Three is the name of my cat)
        images = images_data.getlist('image')
        for img in images:
            print(img)
            SetImage.objects.create(set=set, image=img)

        #RETURN
        return set

    def update(self, instance, validated_data):
        #SET 
        set = instance
        instance.title = validated_data['title']
        instance.description = validated_data['description']
        instance.references = self.context.get('view').request.data.get('references')
        #IMAGES
        editingState = self.context.get('view').request.data.get('editingState')
        removedImageId = self.context.get('view').request.data.get('removedImageId')

        if editingState == 'removingImage':
            image_instance = SetImage.objects.filter(id=removedImageId).first()
            image_instance.delete()
        else:
            images_data = self.context.get('view').request.FILES
            images = images_data.getlist('image')
            for img in images:
                print(img, 'got uploaded')
                SetImage.objects.create(set=set, image=img)
        #NOTES
        noteContent = self.context.get('view').request.data.get('noteContent')
        noteId = self.context.get('view').request.data.get('noteId')
        noteX = self.context.get('view').request.data.get('x')
        noteY = self.context.get('view').request.data.get('y')
        noteImage = self.context.get('view').request.data.get('setImage_id')
        editingState = self.context.get('view').request.data.get('editingState')
        if editingState == 'adding':
             SetNotes.objects.update_or_create(setImage_id=noteImage, noteContent=noteContent, x=noteX, y=noteY)
        if editingState == 'editing':
             note_instance = SetNotes.objects.filter(id=noteId).first()
             note_instance.noteContent = noteContent
             note_instance.save()
        if editingState == 'deleting':
             note_instance = SetNotes.objects.filter(id=noteId).first()
             note_instance.delete()

        #Saving and returning
        instance.save()
        return instance

