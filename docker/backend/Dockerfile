FROM python:3.13

# Set working directory
WORKDIR /code

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="/root/.local/bin:${PATH}"

COPY ../../ /code/

# Install dependencies (runtime only)
RUN poetry install --without dev

CMD ["poetry", "run","uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips=*"]
