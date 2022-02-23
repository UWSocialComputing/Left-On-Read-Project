from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'room', views.RoomStatusViewSet, basename='room_status')
router.register(r'status', views.StatusViewSet, basename='status')
# router.register(r'preferences', views.)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]