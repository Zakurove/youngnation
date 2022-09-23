from accounts.models import User
from django.db import models 
from django.db.models import JSONField


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
