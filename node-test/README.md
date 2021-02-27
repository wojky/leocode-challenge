## Powered by

[Nest](https://github.com/nestjs/nest) framework

## Installation

```bash
$ npm install
```

Provide .env file with JWT_SECRET_KEY entry

## Running the app - default on localhost:3000

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## User credentials

```
1. E: test@test P: testtest
2. E: wanda@marvel.com P: wandavision
```

## Routes

```
/api/sign-in   | body {email: string; password: string;}
/api/generate-key-pair   *bearer token required
/api/encrypt   *bearer token required
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
