
from rest_framework import viewsets
from rest_framework.decorators import action
from .services import RAG_response
from rest_framework.response import Response

class ChatResponseSet(viewsets.ViewSet):
    
    @action(methods=["POST"],detail=False)
    def answer_user_question(self, request):
        user_question = request.data.get("user_input")
        response = RAG_response(user_question)
        return Response({"message": "hello world"})