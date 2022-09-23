from accounts.models import User
from django.db import models 
from django.db.models import JSONField

# def upload_path(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])


# ----------------------------------------------------------------------------------------------

# Session
class Session(models.Model):
    age = models.CharField(max_length=20,blank=True, null=True)
    height = models.CharField(max_length=20,blank=True, null=True)
    weight = models.CharField(max_length=20,blank=True, null=True)
    armL = models.CharField(max_length=20,blank=True, null=True)
    legL = models.CharField(max_length=20,blank=True, null=True)
    chestG = models.CharField(max_length=20,blank=True, null=True)
    sport = models.TextField( blank=True, null=True)
    date = models.DateField(auto_now_add=True, null=True)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="Session", on_delete=models.CASCADE, null=True)
    
    def save(self, *args, **kwargs):
        super(Session, self).save(*args, **kwargs)

# Set
class Set(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    highYield = models.TextField(blank=True, null=True)
    references = models.TextField(blank=True, null=True)
    block = models.CharField(blank=True, null=True, max_length=20)
    subject = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="set", on_delete=models.CASCADE, null=True)
    
    def save(self, *args, **kwargs):
        super(Set, self).save(*args, **kwargs)


class SetImage(models.Model):
    set = models.ForeignKey(Set, on_delete=models.CASCADE,
                            null=True, related_name='setImages')
    image = models.ImageField(upload_to='Sets', blank=True, null=True)


class SetNotes(models.Model):
    setImage = models.ForeignKey(
        SetImage, on_delete=models.CASCADE, null=True, related_name='setNotes')
    noteContent = models.TextField(blank=True, null=True)
    x = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)

class SetFeature(models.Model):
    set = models.ForeignKey(Set, on_delete=models.CASCADE,
                            null=True, related_name='setFeatures')
    title = models.CharField(max_length=400, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

#Cluster
class Cluster(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    block = models.CharField(blank=True, null=True, max_length=20)
    subject = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="cluster", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and clusters
    sets = models.ManyToManyField(Set, related_name='clusters', blank=True)

    def save(self, *args, **kwargs):
        super(Cluster, self).save(*args, **kwargs)

#PracticeDescInput
class PracticeDescInput(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    description = models.TextField(blank=True, null=True)
    block = models.CharField(blank=True, null=True, max_length=21)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="practiceDescInput", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and PracticeDescInput
    sets = models.ManyToManyField(Set, related_name='practiceDescInput', blank=True)

    def save(self, *args, **kwargs):
        super(PracticeDescInput, self).save(*args, **kwargs)

#PracticeDescSession
class PracticeDescSession(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    practiceType = models.CharField(default="Description", max_length=40)
    block = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="practiceDescSession", on_delete=models.CASCADE, null=True)
    #Many to many relationship between sets and Practice session
    sets = models.ManyToManyField(Set, related_name='practiceDescSession', blank=True)
    practiceDescInputs = models.ManyToManyField(PracticeDescInput, related_name='practiceDescSessions', blank=True)

    def save(self, *args, **kwargs):
        super(PracticeDescSession, self).save(*args, **kwargs)

#PracticeIdentifySession
class PracticeIdentifySession(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    practiceType = models.CharField(default="Identification", max_length=40)
    block = models.CharField(blank=True, null=True, max_length=20)
    owner_username = models.CharField(max_length=30, null=True)
    owner = models.ForeignKey(
        User, related_name="practiceIdentifySession", on_delete=models.CASCADE, null=True)
    questions = JSONField(encoder=None, blank=True, null=True)
    result = JSONField(encoder=None, blank=True, null=True)
    # #Many to many relationship between sets and Practice session
    images = models.ManyToManyField(SetImage, related_name='practiceIdentifySession', blank=True)
    # practiceDescInputs = models.ManyToManyField(PracticeDescInput, related_name='practiceDescSessions', blank=True)

    def save(self, *args, **kwargs):
        super(PracticeIdentifySession, self).save(*args, **kwargs)

#EmailList
class EmailList(models.Model):
    email = models.CharField(max_length=200)
    currentBlock = models.CharField(blank=True, null=True, max_length=20)

    def save(self, *args, **kwargs):
        super(EmailList, self).save(*args, **kwargs)