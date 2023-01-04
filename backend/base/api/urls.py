from django.urls import path,include,re_path
from django.views.generic import TemplateView
from . import views
from rest_framework import routers
from .views import MyTokenObtainPairView 
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
 
# register the router
router.register(r'user',views.UserView, 'user')



urlpatterns = [
    # path('',views.getRoutes),
    path('profile/', views.getProfile),
    path('users/register',views.registerUser, name='register'),
    path('users/login',views.loginUser, name='login'),
    path('admin/login',views.loginAdmin, name='loginAdmin'),
    path('admin/userdetails',views.userDetails, name='userDetails'),
    path('admin/userdelete',views.userDelete, name='userDetails'),
    path('',include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)