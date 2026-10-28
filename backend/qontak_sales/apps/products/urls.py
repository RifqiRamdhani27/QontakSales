from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet, ProductUnitViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"product-categories", ProductCategoryViewSet, basename="product-category")
router.register(r"product-units", ProductUnitViewSet, basename="product-unit")

urlpatterns = [
    path("", include(router.urls)),
]
