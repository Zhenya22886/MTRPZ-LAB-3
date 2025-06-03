FROM ubuntu

WORKDIR /application

COPY requirements.txt .

RUN apt update && apt upgrade && apt install -y python3 python3-pip python3-venv

RUN python3 -m venv .venv

RUN . .venv/bin/activate && .venv/bin/pip install --upgrade pip && .venv/bin/pip install -r requirements.txt

COPY . .

CMD [ ".venv/bin/uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8888" ]