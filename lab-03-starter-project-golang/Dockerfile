FROM golang:1.24 AS builder

WORKDIR /application

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o fizzbuzz

FROM gcr.io/distroless/static-debian12

WORKDIR /application

COPY --from=builder /application/fizzbuzz .

COPY --from=builder /application/templates ./templates

CMD [ "./fizzbuzz", "serve" ]
