# Simple node RESTAPI

## Requirements
- node
- mongodb

**NOTE**: docker compose up or using devconatiner

## Start

```
bun start
```

## API

- GET: api/v1/health: status of database 
  ```
  curl http://localhost:3001/api/v1/health
  ```
  
- POST: api/v1/accounts: create new account
  ```
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "account name", "number": "ac0001", "type": "root", "status": "new"}' \
    http://localhost:3001/api/v1/accounts
  ```
  
- GET: api/v1/accounts: get all account
  ```
  curl http://localhost:3001/api/v1/accounts
  ```
  
- PUT: api/v1/accounts/{id}: update account by account id
- DELETE: api/v1/accounts/{id}: delete account by account id