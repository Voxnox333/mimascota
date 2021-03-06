# README #

### How do I set up? ###

* Create DB
* Set database configuration in .env
* Run localhost:3000/sync (script to create table with one user)

### NOTE: Fork this project and send me your github link ###

1) ### Create user endpoint ###

* Create user endpoint for add, update and delete user. (Changed should be reflected in the DB)
* Each endpoint must validate data type. (ex: validate email. If is not valid, return code error with error description).
* Implement jwt Auth. For login, the user should call to /login and use his name and email as credentials.
* Only users logged in should be able to edit their data.

2) ### Create a query to get sales by year and month from this table ###

| id  | provider_id | client_id  | price | created             |
| --- |:-----------:| ----------:| -----:| -------------------:|
|  1  | 3049        |   493      | $1600 | 2018-09-12 10:32:13 |
|  2  | 3495        |   540      | $1200 | 2018-09-16 11:32:27 |
|  3  | 5444        |   493      | $1000 | 2018-10-14 13:32:16 |
|  4  | 3049        |   493      | $1400 | 2018-10-12 10:32:13 |
|  5  | 3495        |   540      | $1650 | 2018-10-16 11:32:27 |
|  6  | 5444        |   124      | $1100 | 2019-01-14 13:32:16 |
|  7  | 3495        |   453      | $1900 | 2019-02-16 11:32:27 |
|  8  | 5444        |   123      | $900  | 2019-03-14 13:32:16 |


Ouput example:

| year | month | reservation | total |
| ---  |:-----:| -----------:| -----:|
| 2018 |  09   |   2         | $2800 |
| 2018 |  10   |   3         | $4050 |
| 2019 |  01   |   1         | $1100 |
| 2019 |  02   |   1         | $1900 |
| 2019 |  03   |   1         | $900  |

```mysql

SET sql_mode = '';
SELECT EXTRACT(YEAR FROM created) as "year" , EXTRACT(MONTH FROM created) as "month", count(*) as "reservation" ,SUM(price) as "total" from sales GROUP BY YEAR(created), MONTH(created) ORDER BY created;

```


3) ### What are the differences between? ###

```throw new Error('something bad happened');```
```
Lanza un objeto error interrupiendo el proceso.
```

```callback(new Error('something bad happened'));```

```
Envia un objeto error en el callback  para ser lanzado interrumpiendo o solo procesar el error sin interrumpir, esto es muy usuado en procesos asincronicos para tomar el error y no romper con lineas de proceso como una excepción.
```


# API Documentation

{{base}} --> localhost:3000/api/v1

**Headers**

```
Content-Type:application/json
Authorization: Bearer {{TOKEN}}
```

## Authorization

**POST**  {{base}}/login

Request

```
{
  "name":"Chuck",
  "email":"chuck@mail.com"
}
```

Response 
```
{
    "success": true,
    "token": "...",
    "user": {
        "id": 1,
        "name": "Chuck",
        "email": "chuck@mail.com"
    }
}
```

## Create User

**POST**  {{base}}/users/

Request

```
{
  "name":"Chuck",
  "email":"chuck3@mail.com",
  "birthday":"1991-06-29"
}
```

Response 
```
{
    "success": true
}
```

## Update User

**PUT**  {{base}}/users/{ID}

Only users can edit their data

Request

```
{
  "name":"Chuck",
  "email":"chuck3@mail.com",
  "birthday":"1991-06-29"
}
```

Response 
```
{
    "success": true,
    "user": {
        "name":"Chuck",
        "email":"chuck3@mail.com",
        "birthday":"1991-06-29"
    }
}
```

## Delete User

**DELETE**  {{base}}/users/{ID}

Response 
```
{
    "success": true,
    "message": "The user was deleted"
}
```

## Detail User

**GET**  {{base}}/users/{ID}
Only users can view their data

Response 
```
{
    success:"true",
    "user":{
      "id": 17,
      "name": "Chuck",
      "birthday": "1991-06-29T00:00:00.000Z"
    }
}
```

## Lista ALL User

**GET**  {{base}}/users

Response 
```
{
    "success": true,
    "user": [
        {
            "id": 1,
            "name": "Chuck",
            "email": "chuck@mail.com",
            "birthday": "1980-07-20T06:00:00.000Z",
            "createdAt": "2019-04-06T01:34:14.000Z",
            "updatedAt": "2019-04-06T01:34:14.000Z"
        }
    ]
}
```


### Error Format

Response 
```
{
    "success": "false",
    "message": "The fields are invalid",
    "validates": [
        {
            "param": "id",
            "msg": "Can not have more than 11 digits",
            "value": "11234567890007"
        }
    ]
}
```