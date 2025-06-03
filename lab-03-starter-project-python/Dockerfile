FROM python:3.12.10-alpine3.22

WORKDIR /application

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8888" ]