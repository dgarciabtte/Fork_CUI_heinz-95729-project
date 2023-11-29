from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.agents.agent_types import AgentType
from langchain.llms.openai import OpenAI
from langchain.sql_database import SQLDatabase



def RAG_response(user_question):
    db = SQLDatabase.from_uri("sqlite:////Users/erichu/Desktop/final_project/final/db.sqlite3")
    toolkit = SQLDatabaseToolkit(db=db, llm=OpenAI(temperature=0))

    agent_executor = create_sql_agent(
        llm=OpenAI(temperature=0),
        toolkit=toolkit,
        verbose=True,
        agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    )
    
    output = agent_executor.run(user_question)
    return output