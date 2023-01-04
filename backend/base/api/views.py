from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser,IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User,auth
import json

from .serializers import ProfileSerializer
from base.models import Profile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class UserView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
   
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token' ,
        'api/token/refresh',
    ]
    return Response(routes)

@api_view(['GET','POST'])
def getProfile(request):
    user = request.POST
    print("user",user)
    profile = Profile.objects.all()
    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data=request.POST
    a=request.FILES
    print(data.get('name'))
    print('a:',a['image'])
    name=data.get('name')
    username= data.get('username')
    password= data.get('password')
    image=a['image']
    user = User.objects.create_user(username=username, password=password, first_name=name)
    profile = Profile.objects.create(user=user, image=image)
    print(profile)
    
    return Response('User was created')

#  and user.is_superuser == False
@api_view(['GET', 'POST'])
def loginUser(request):
    data = request.data
    print(data)
    username = data['username']
    password = data['password']
    if Profile.objects.filter(username=username).exists():
        if Profile.objects.filter(password=password).exists():
            user=Profile.objects.get(username=username)
            return Response(user.id)
        else:
            return Response('Password is incorrect')
    else:
        Response('User not found')
    return Response('User not found')

@api_view(['GET', 'POST'])
def loginAdmin(request):
    data = request.data
    print(data)
    username = data['username']
    password = data['password']
    if Profile.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        if Profile.objects.filter(password=password).exists() and user.is_superuser == True:
            return Response(username)
        else:
            return Response('Password is incorrect')
    else:
        return Response('admin not found')
    
    
@api_view(['GET'])
def userDetails(request):
    user = User.objects.all()
    serializer = UserSerializer(user,many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def userDelete(request,pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response('User was deleted')

