# Backend Test PandaSoft


## Project setup
```
npm install
```

### Run
```
node server
```

### API Guild

##### User Create
```
POST /api/user/create
```
###### Parameter
```sh
| Parameter             | Required | Type   | Description |
|-----------------------|----------|--------|-------------|
| username              | yes      | string |             |
| password              | yes      | string |             |
| password_confirmation | yes      | string |             |

```

##### User Login
```
POST /api/user/login
```

###### Parameter
```sh
| Parameter | Required | Type   | Description |
|-----------|----------|--------|-------------|
| username  | yes      | string |             |
| password  | yes      | string |             |

```

##### User Logout
###### Header Authorization: Bearer
```
POST /api/user/logout
```

###### Parameter
```sh
| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
|           |          |      |             |
|           |          |      |             |

```

##### Product Create
```
POST /api/product/create
```

###### Parameter
###### Header Authorization: Bearer
```sh
| Parameter           | Required | Type    | Description |
|---------------------|----------|---------|-------------|
| product_no          | no       | string  |             |
| product_name        | request  | string  |             |
| product_price       | request  | numeric |             |
| product_description | no       | string  |             |

```

##### Product Create
```
GET /api/product
```

###### Parameter
###### Header Authorization: Bearer
```sh
| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
|           |          |      |             |
|           |          |      |             |

```

##### Product Edit
```
PUT /api/product/:id
```

###### Parameter
###### Header Authorization: Bearer
```sh
| Parameter           | Required | Type    | Description |
|---------------------|----------|---------|-------------|
| product_no          | no       | string  |             |
| product_name        | no       | string  |             |
| product_price       | no       | numeric |             |
| product_description | no       | string  |             |

```

##### Product Delete
```
DELETE /api/product/:id
```

###### Parameter
###### Header Authorization: Bearer
```sh
| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
|           |          |      |             |
|           |          |      |             |

```