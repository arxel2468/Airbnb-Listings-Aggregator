from django.urls import path
from . import views

urlpatterns = [
    path('listings/', views.get_listings, name='get_listings'),
    path('add_listing/', views.add_listing, name='add_listing'),
    path('listings/<int:pk>/', views.get_listing, name='get_listing'),
]