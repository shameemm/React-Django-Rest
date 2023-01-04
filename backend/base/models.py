from django.db import models
from django.contrib.auth.models import User
from django import forms

# Create your models here.
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Profile(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    is_superuser = models.BooleanField(default=False)
    image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    
    

    def __str__(self):
        return self.username