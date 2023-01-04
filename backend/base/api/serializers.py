from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from base.models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        