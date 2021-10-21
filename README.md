# URL Shortener - API

Service responsible for the URL shortener

## Setup

### Local Setup


## Rest API

### POST / (Create)

create a new URL based on originalUrl

#### Request

```json
{
  "full": "https://www.yoursite.com/your-path/your-page"
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "uuid": "0b354e7c-3d7a-4a42-94ea-135e7d20cd7d",
    "short": "hRYzMtjx",
    "full": "https://www.yoursite.com/your-path/your-page",
    "createdAt": "2020-07-30T21:37:16.321Z",
    "clicks": 0
  }
}
```

### GET /{CODE} (Open URL)

Open the originalUrl based on code

#### Request

```
GET http://localhost:3000/hRYzMtjx
```

#### Response

```
It redirects to the originalUrl
```

## Deploy

This service is using AWS lambda with the serveless Caludia

### Configure your AWS access credentials

To accomplish this you need to:

- Create an AWS profile with IAM full access, Lambda full access and API Gateway Administrator privileges.
- Add the keys to your .aws/credentials file:

```text
  [default]
  aws_access_key_id = YOUR_ACCESS_KEY
  aws_secret_access_key = YOUR_ACCESS_SECRET
```

