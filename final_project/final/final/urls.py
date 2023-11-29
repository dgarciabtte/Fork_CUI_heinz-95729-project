from django.contrib import admin
from django.urls import path
from chat.api.views import ChatResponseSet
from security.api.views import get_csrf
from rest_framework import routers


router = routers.DefaultRouter()

router.register(r"api/chat", ChatResponseSet, basename="chat")

urlpatterns = [
    path('admin/', admin.site.urls),
    
]
